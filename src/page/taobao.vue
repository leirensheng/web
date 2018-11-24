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

    <div>
      <taobao-item v-for="(one,index) in records" :key="index" :goods="one"></taobao-item>
    </div>

    <div class="loadMoreContainer" v-if="records.length">
      <bottom-loading :loading="loading" :noMore="noMore" :loadingTimes="loadingTimes" :loadingErr=loadingErr @loadingMore="loadMore"></bottom-loading>
    </div>

  </div>
</template>

<script>
import loading2 from "../components/loading2.vue";
import bottomLoading from "../components/bottomLoading.vue";
import { ajax } from "../support/ajax.js";
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
    bottomLoading
  },
  methods: {
    search() {
      ajax({
        url: `/tbSearch?page=${this.searchPage}&q=${this.searchKeyword}`,
        method: "get",
        timeout: 5000
      }).then(res => {
        this.records = res.data;
        // console.log(res)
      });
    },
    handleTbData(data) {
      this.records = data.map(one => {});
    },
    loadMore() {
      this.loading = true;
      this.loadingTimes++;
      ajax({
        url: "/getGoods?length=10&lastId=" + this.lastId,
        method: "get",
        timeout: 5000
      })
        .then(resData => {
          if (resData.length) {
            this.records.push(...resData.data);
            this.lastId = this.records.slice(-1)[0].id;
            this.loadingErr = false;
          } else {
            this.noMore = true;
          }
        })
        .catch(() => {
          this.loadingErr = true;
        })
        .then(() => {
          this.loading = false;
        });
    },
    bindEvent() {
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          if (getScrollHeight() <= getWindowHeight() + getDocumentTop() + 25) {
            if (this.loadingTimes <= 2 && !this.loading) {
              this.loadMore();
            }
          }
        });
      });
    }
  },
  data() {
    return {
      searchKeyword: "",
      searchPage: 1,
      records: [],
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
      border-radius:  0.3rem 0  0 0.3rem ;
    }
    div{
      // height: 99%;
  height: 2.2rem;

      width: 3.1rem;
      padding: 0.2rem;
      cursor: pointer;
      background-color: $orange;
      border-radius: 0 0.3rem 0.3rem 0 ;
      color:white;
      display: flex;
      align-items: center;
      justify-content: center
    }
  }
}
</style>

