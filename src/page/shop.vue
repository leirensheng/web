<template>
  <div id='shop'>
    <div class='verytop'>
      <div class='webName'>购物频道</div>
      <div class='webIntro'>优惠好物</div>
    </div>

    <div>
      <shop-item v-for="(one,index) in records" :key="index" :goods="one"></shop-item>
    </div>

    <div class="loadMoreContainer" v-if="records.length">
      <bottom-loading :loading="loading" :noMore="noMore" :loadingTimes="loadingTimes" :loadingErr=loadingErr @loadingMore="loadMore"></bottom-loading>
    </div>

  </div>
</template>

<script>
import loading2 from "../components/loading2.vue";
import bottomLoading from "../components/bottomLoading.vue";
import {
  getWeekDay,
  checkDate,
  getWindowHeight,
  getDocumentTop,
  getScrollHeight
} from "../support/util";
import shopItem from "../components/shopItem";
export default {
  components: {
    shopItem,
    bottomLoading
  },
  methods: {
    initData() {
      this.$ajax({
        methods: "get",
        url: "/getGoods?length=5"
      })
        .then(res => {
          this.records = res.data;
          this.lastId = this.records.slice(-1)[0].id;
        })
        .catch(e => {})
        .then(() => {
          this.bindEvent();
        });
    },
    loadMore() {
      this.loading = true;
      this.loadingTimes++;
      this.$ajax({
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
    scrollHandler(){
       window.requestAnimationFrame(() => {
          if (getScrollHeight() <= getWindowHeight() + getDocumentTop() + 25) {
            if (this.loadingTimes <= 2 && !this.loading) {
              this.loadMore();
            }
          }
        });
    },
    bindEvent() {
      window.addEventListener("scroll", this.scrollHandler);
    }
  },
  beforeDestroy(){
      window.removeEventListener('scroll',this.scrollHandler)
  },
  data() {
    return {
      searchKeyword:'',
      searchPage:1,
      records: [],
      loadingTimes: 0,
      loading: false,
      loadingErr: false,
      noMore: false,
      lastId: ""
    };
  },
  mounted() {
    this.initData();
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
#shop {
  padding: 2rem;
  background-color: rgb(199, 189, 184);
}
</style>

