<template>
  <vdialog
    :loading="loading"
    :visible="visible"
    :btns="btns"
    :title="'淘口令'"
    :content="content"
    @close=closeDialog
    @copy=handleCopy
  ></vdialog>
</template>
<script>
import vdialog from "../components/vdialog.vue";
import {copyContent} from '../support/util'
export default {
  components: {
    vdialog
  },
  watch:{
     url:{
       handler(url){
         if(url){
           this.handleGenerate(url,this.logoUrl,this.text)
         }
       }
     },
     defaultData:{
       handler(val){
         console.log('in')
        if(val){
          this.content=val
          this.visible = true;
        }
       }
     }
  },
    props: [`url`, `logoUrl`, `text`,`defaultData`],
  data() {
    return {
      visible:false,
      content:'',
      loading:false,
      btns: [
        {
          id: "copy",
          name: "复制",
          color: "rgb(255, 90, 0)"
        },
        {
          id: "close",
          name: "关闭",
          color: "rgb(120,120,120)"
        }
      ]
    };
  },
  methods: {
    handleCopy(str) {
      copyContent(str);
      let temp=this.btns.shift()
      this.content = "已复制，请打开淘宝";
      this.$emit('reset')
      setTimeout(() => {
        this.visible = false;
        this.btns.unshift(temp)
      }, 2000);
    },
    closeDialog() {
      this.$emit('reset')
      this.visible = false;
    },
    handleGenerate(url, logoUrl, text) {
      this.visible = true;
      this.loading = true;
      this.$ajax({
        url: "/getTaokouling",
        method: "post",
        headers: {
          "content-type": "application/json"
        },
        data: JSON.stringify({
          url: "https:" + url,
          logo: logoUrl,
          text
        })
      })
        .then(res => {
          this.loading = false;
          this.content = res.data.model;
        })
        .catch(e => {
          this.content = "网络故障，请重试";
          this.loading = false;
        });
    }
  }
};
</script>

