<template>
    <div class="ad">
        <div class="imgContainer">
            <img :src="ad.image" alt="" v-if='ad.image'>
        </div>
        <message :article="ad" :article-index="0" :titleAlign='"center"'></message> 
        <div class="adBtnContainer">
            <div class="adBtn">立即围观</div>
        </div>
    </div>
</template>
<script>
import message from './message.vue'
export default {
  data() {
    return {};
  },
  props: {
    ad: {
      type: Object,
      default: {}
    }
  },
  components: {
      message
  },
  methods: {}
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
.imgContainer {
  display: flex;
  justify-content: space-around;
  img {
    width: 80%;
    // height: ;
    text-align: center;
  }
}
.adBtnContainer{
    display: flex;
    justify-content: center;
    .adBtn{
        text-align: center;
        padding: .5rem;
        width: 50%;
        color: white;
        background: $orange;
        border-radius: 1rem;
    }
}
</style>
