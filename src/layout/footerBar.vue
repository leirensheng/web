<template>
  <div id="footer">
    <!-- <div id='footerKeywordContainer'>
      <div id='footerKeyword' v-for="(one,index) in keywords" :key='index'>{{one.keyword}}</div>
    </div> -->
    <div id='copyright'>Copyright © 2018</div>
  </div>
</template>

<script>
export default {
  name: "footerBar",

  data() {
    return {
      keywords: [
        { keyword: "广告合作", url: "" },
        { keyword: "免责声明", url: "" },
        { keyword: "友情链接", url: "" },
        { keyword: "联系我们", url: "" }
      ]
    };
  },
  components: {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

#footer {
  padding: 0.9rem;
  font-size:0.9rem; 
  // height: 4rem;
  background-color: rgb(255,255,255);
  // color: rgb(170,170,170);
  // width: 100%;
  color: rgb(85, 82, 82);

  #footerKeywordContainer {
    display: flex;
    justify-content: space-around;
   
  }
  #copyright{
    text-align: center;
    // margin-top: 1rem;
  }
}
</style>
