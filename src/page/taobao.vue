<template>
  <div id='taobao'>
    <div class='verytop'>
      <div class='webName'>超级搜索</div>
      <div class='webIntro'>优惠好物</div>
    </div>
    <div id='searchCon'>
      <div id='searchWrap'>
        <input
          type="text"
          v-model="searchKeyword"
        >
        <div @click="search">
          <span>搜索</span>
        </div>
      </div>
    </div>

    <div
      id='loadingWrap'
      v-if='searching'
    >
      <loading id='loading'></loading>
    </div>
    <div v-else>
      <taobao-item
        @generate="handleGenerate"
        v-for="(one,index) in records"
        :key="index"
        :goods="one"
      ></taobao-item>
    </div>

    <div
      class="loadMoreContainer"
      v-if="records.length && !searching"
    >
      <bottom-loading
        v-if="records.length>3"
        :loading="loading"
        :noMore="noMore"
        :loadingTimes="loadingTimes"
        :loadingErr=loadingErr
        @loadingMore="loadMore"
      ></bottom-loading>
    </div>
    <taokouling
      @reset="handleReset"
      :url="taokouling.url"
      :logoUrl="taokouling.logoUrl"
      :text="taokouling.text"
    ></taokouling>
  </div>
</template>

<script>
import loading from "../components/loading.vue";
import bottomLoading from "../components/bottomLoading.vue";
import taokouling from "../components/taokouling.vue";
import {
  getWeekDay,
  checkDate,
  getWindowHeight,
  getDocumentTop,
  getScrollHeight
} from "../support/util";
import taobaoItem from "../components/taobaoItem";
export default {
  components: {
    taobaoItem,
    loading,
    bottomLoading,
    taokouling
  },
  methods: {
    handleReset() {
      this.taokouling.url = this.taokouling.logoUrl = this.taokouling.text = "";
    },
    search() {
      this.searching = true;
      this.noMore = false;
      let q=this.searchKeyword
      let reg=/(￥.*￥)/ig
      let result= reg.exec(this.searchKeyword)
      
      if(result[1]){
         q=result[1]
      }
      this.$ajax({
        url: `/tbSearch?page=${this.searchPage}&q=${q}`,
        method: "get",
        timeout: 15000
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
    handleGenerate(url, logoUrl, text) {
      this.taokouling.url = url;
      this.taokouling.logoUrl = logoUrl;
      this.taokouling.text = text;
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
    scrollHandler() {
      window.requestAnimationFrame(() => {
        if (getScrollHeight() <= getWindowHeight() + getDocumentTop() + 25) {
          if (!this.loading && !this.noMore) {
            this.loadMore();
          }
        }
      });
    },
    bindEvent() {
      window.addEventListener("scroll", this.scrollHandler);
    }
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.scrollHandler);
  },
  data() {
    return {
      taokouling: {
        url: "",
        logoUrl: "",
        text: ""
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

