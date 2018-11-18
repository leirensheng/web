<template>
  <div id='shopItem'>
    <div id='itemLeft'>
      <img :src="goods.pic" alt="">
    </div>
    <div id='itemRight'>
      <div id="shopTitle" @click=gotoMall(goods.url)>
         {{goods.title}}
      </div>
      <div id="shopPrice">
         {{goods.priceDesc}}
      </div>
      <div id="shopInfo">
          <div id='shopSource'>
            {{goods.mall}}| {{goods.date}}
          </div>
          <!-- <div id='shopComment'>
            {{goods.comment}}
          </div> -->
          <div id='star' @click="addStar" :class="hasAdd? 'hasAdd':''">
             <i class="icon iconfont icon-weibiaoti-  zan">
                </i>
            {{goods.comment}}
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasAdd:false
    };
  },
  props: {
    goods:{
      default:{}
    }
  },
  components: {},
  methods: {
        addStar() {
      if (!this.hasAdd) {
        this.hasAdd = true;
        this.goods.comment++;
      }
    },
    gotoMall(url){
      window.location.href=url
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

.hasAdd{
  color:$orange !important;
}
#shopItem {
  border-radius: 0.2rem;
  background-color: white;
  margin: 0.8rem;
  border: 1px solid rgb(228, 227, 224);
  padding: 1rem;
  display: flex;
  // border: 1px solid red;
  align-items: center;
  #itemLeft {
    height: 7.4rem;
    width: 7.4rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  #itemRight {
    padding: 0.7rem;
    flex: 1;
    #shopTitle{
      cursor: pointer;
      text-overflow:ellipsis;
      font-weight: 700;
         overflow: hidden;
         max-height: 3.43rem;
         line-height: 1.714rem;
    }
    #shopPrice{
      margin-top: 0.8rem;
        color:  #f04848
        
    }
   #shopInfo{
     color: #888;
      display: flex;
      margin-top: 0.8rem;
      #shopSource{
         width: 9rem;
         flex: 1
      }
      // #shopComment{
      //    width: 4rem;

      // }
      #star{
        width: 3rem;
        align-self: flex-end;
      }
   }
  }
}
</style>
