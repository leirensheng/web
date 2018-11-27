<template>
  <div id='shopItem'>
    <div id='itemLeft' @click=gotoMall(goods.url)>
      <img :src="goods.pic" alt="">
    </div>
    <div id='itemRight'>
      <div id="shopTitle" @click=gotoDetail(goods.id)>
        {{goods.title}}
      </div>
      <div id='middle'>
        <div id="shopPrice">
           <span>{{goods.priceDesc}}</span>
        </div>
        <div id='conpon'>
          <div class="left">
            <span>券</span>
          </div>
          <div class="right">
            {{goods.conpon}}
          </div>
        </div>
      </div>
      <div id="shopInfo">
        <div id='shopSource'>
          {{goods.mall}} 月销 {{goods.volume}}
        </div>
        <div id='tkl'>
          <div @click="copy(goods.url,goods.pic, goods.title)">淘口令</div>
        </div>


      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      hasAdd: false
    };
  },
  props: {
    goods: {
      default: {}
    }
  },
  components: {},
  methods: {
    gotoDetail(id){
      sessionStorage.setItem('item',JSON.stringify(this.goods))
      this.$router.push(`/detail?id=${id}`)
      // console.log('in',id)
      //  this.$emit('detail',id)
    },
    gotoMall(url) {
      window.open(url);
    },
    copy(url,pic,title){
      this.$emit('generate',url,pic,title)
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

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
    img {
      width: 100%;
      height: 100%;
    }
  }
  #itemRight {
    padding: 0.7rem;
    flex: 1;
    #shopTitle {
      cursor: pointer;
      text-overflow: ellipsis;
      font-weight: 700;
      overflow: hidden;
      max-height: 3.43rem;
      line-height: 1.714rem;
    }
    #middle {
      height: 2rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      #shopPrice {
        // margin-top: 0.8rem;
        color: #f04848;
        display: flex;
        align-items: center;
      }
      #conpon {
        border: 1px solid $orange;
        border-radius: 0.3rem;
        height: 70%;
        width: 5rem;
        // align-self: flex-end;
        display: flex;
        align-items: center;
        .left {
          height: 100%;
          width: 1.8rem;
          //  text-align: center;
          background-color: $orange;
          color: white;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .right {
          text-align: center;
          flex: 1;
          color: $orange;
          font-size: 1rem;
        }
      }
    }

    #shopInfo {
      color: #888;
      display: flex;
      align-items: center;
      margin-top: 0.8rem;
      #shopSource {
        width: 2rem;
        flex: 1;
      }
      #tkl{
        cursor: pointer;
      }
      // #shopComment{
      //    width: 4rem;

      // }
    }
  }
}
</style>
