<template>
  <div id='taobao'>
    <div class='verytop'>
      <div class='webName'>超级搜索</div>
      <div class='webIntro'>优惠好物</div>
    </div>
    <div id='searchCon'>
      <div id='searchWrap'>
        <input type="text" v-model="searchKeyword">
        <div @click="search">
          <span>搜索</span>
        </div>
      </div>
    </div>

    <div id='loadingWrap' v-if='searching'>
      <loading id='loading'></loading>
    </div>
    <div v-else>
      <taobao-item @generate="handleGenerate" v-for="(one,index) in records" :key="index" :goods="one"></taobao-item>
    </div>

    <div class="loadMoreContainer" v-if="records.length">
      <bottom-loading :loading="loading" :noMore="noMore" :loadingTimes="loadingTimes" :loadingErr=loadingErr @loadingMore="loadMore"></bottom-loading>
    </div>
    <vdialog :loading="taokouling.loading" :visible="taokouling.visible" :btns="taokouling.btns" :title="'淘口令'" :content="taokouling.content" @close=closeDialog @copy=handleCopy ></vdialog>
  </div>
</template>

<script>
import loading from "../components/loading.vue";
import bottomLoading from "../components/bottomLoading.vue";
import vdialog from "../components/vdialog.vue";
import { ajax } from "../support/ajax.js";
import {
  getWeekDay,
  checkDate,
  getWindowHeight,
  getDocumentTop,
  getScrollHeight,
  copyContent
} from "../support/util";
import taobaoItem from "../components/taobaoItem";
export default {
  components: {
    taobaoItem,
    loading,
    bottomLoading,
    vdialog
  },
  methods: {
    search() {
      this.searching = true;
      this.noMore = false;
      ajax({
        url: `/tbSearch?page=${this.searchPage}&q=${this.searchKeyword}`,
        method: "get",
        timeout: 5000
      })
        .then(res => {
          this.allData = res.data;
          this.records = res.data.slice(0, this.onePageNum);
          this.bindEvent();
          this.searching = false;
        })
        .catch(e => {
          console.log(e);
          this.searching = false;
        });
    },
    handleCopy(str) {
      console.log(str)
      copyContent(str);
      this.taokouling.content='已复制，请打开淘宝'
      setTimeout(()=>{
      this.taokouling.visible=false

      },2000)
    },
    closeDialog(){
      this.taokouling.visible=false
    },
    handleGenerate(url, logoUrl, text) {
      this.taokouling.visible = true;
      this.taokouling.loading = true;

      ajax({
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
          this.taokouling.loading = false;
          this.taokouling.content = res.data.model;
        })
        .catch(e => {
          // console.log(e)
          this.taokouling.content='网络故障，请重试'
          this.taokouling.loading = false;
        });
      //  copyContent()
    },
    loadMore() {
      this.loading = true;
      this.records = this.allData.slice(
        0,
        this.records.length + this.onePageNum
      );
      setTimeout(() => {
        this.loading = false;
      }, 1000);
      if (this.records.length === this.allData.length) {
        this.noMore = true;
      }
    },
    bindEvent() {
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          if (getScrollHeight() <= getWindowHeight() + getDocumentTop() + 25) {
            if (!this.loading && !this.noMore) {
              this.loadMore();
            }
          }
        });
      });
    }
  },
  data() {
    return {
      taokouling: {
        visible: false,
        loading: false,
        content: "",
        btns: [
          {
            id: "copy",
            name: "复制",
            color: "red"
          },
          {
            id: "close",
            name: "关闭",
            color: "green"
          }
        ]
      },
      onePageNum: 7,
      searchKeyword: "",
      searching: false,
      searchPage: 1,
      records: [],
      allData: [],
      loadingTimes: 0,
      loading: false,
      loadingErr: false,
      noMore: false,
      lastId: ""
    };
  },
  mounted() {}
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
#loadingWrap {
  display: flex;
  justify-content: center;
}
#searchCon {
  display: flex;
  justify-content: center;
  #searchWrap {
    // width: 80%;
    width: 12rem;
    display: flex;
    align-content: center;
    input {
      width: 90%;
      height: 2.1rem;
      border-radius: 0.3rem 0 0 0.3rem;
    }
    div {
      // height: 99%;
      height: 2.2rem;

      width: 3.1rem;
      padding: 0.2rem;
      cursor: pointer;
      background-color: $orange;
      border-radius: 0 0.3rem 0.3rem 0;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>

