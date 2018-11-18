<template>
  <div>
    <div id='loadMore' @click="load" v-if='!loading&&loadingTimes>=3&&!noMore'>
      <i class="el-icon-more"></i>
      <span >加载更多</span>
    </div>

    <div id='btnLoadingCon'>
      <span v-if="noMore">没有更多了</span>

      <div v-if='loadingTimes<=2 && !loading'>上拉刷新</div>
      <div v-if='loadingErr'>加载出错，请重试</div>
      <loading2 v-if='loading' id='btnLoading'></loading2>

    </div>
  </div>
</template>

<script>
import loading2 from "../components/loading2.vue";

export default {
  components: {
    loading2
  },
  methods: {
    load() {
      this.$emit("loadingMore");
    }
  },
  props: {
    loading: {
      default: false
    },
    loadingTimes: {
      default: 0
    },
    loadingErr: {
      default: false
    },
    noMore: {
      default: false
    }
  }
};
</script>
<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

#loadMore {
  text-align: center;
  background-color: $orange;
  padding: 0.8rem;
  color: white;
  border-radius: 0.2rem;
  font-size: 1.1rem;
  i {
    margin-right: 0.5rem;
  }
}
#btnLoadingCon {
  display: flex;
  justify-content: center;
}
</style>




