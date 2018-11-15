<template>
    <div>
      <div id='loadMore'  v-if='!loading&&loadingTimes>=3'>
        <i class="el-icon-more"></i>
        <span v-if="!noMore" @click="load">加载更多</span>
        <span v-else>没有更多了</span>
      </div>
      <div v-if='loadingTimes<=2 && !loading'>上拉刷新</div>
      <div v-if='loadingErr'>加载出错，请重试</div>
      <loading2 v-if='loading' id='btnLoading'></loading2>
    </div>
</template>

<script>
import loading2 from "../components/loading2.vue";

export default {
   components: {
    loading2
  },
  methods:{
    load(){
      this.$emit('loadingMore')
    }
  },
  props:{
    loading:{
      default:false
    },
    loadingTimes:{
      default:0
    },
    loadingErr:{
      default:false
    },
    noMore:{
      default:false
    }
  },

};
</script>
<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

  #loadMore {
    text-align: center;
    width: 95%;
    background-color: $orange;
    padding: 0.8rem;
    color: white;
    border-radius: 0.2rem;
    font-size: 1.1rem;
    i {
      margin-right: 0.5rem;
    }
  }
</style>




