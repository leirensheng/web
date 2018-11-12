<template>
  <div id='shopItem'>
    <div id='itemLeft'>
      <img src="https://y.zdmimg.com/201703/23/58d38079c45d95980.jpg_a200.jpg" alt="">
    </div>
    <div id='itemRight'>
      <div id="shopTitle">
         绝对值：WORKPRO 万克宝 W00010005 家用冲击电钻工具 170件套装
      </div>
      <div id="shopPrice">
           66元包邮（需用码，合188元/件）
      </div>
      <div id="shopInfo">
          <div id='shopSource'>
            网易考拉| 22:31
          </div>
          <div id='shopComment'>
            3
          </div>
          <div id='star'>
            88
          </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {},
  components: {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
#shopItem {
  padding: 1rem;
  display: flex;
  border: 1px solid red;
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
      text-overflow:ellipsis;
      font-weight: 700;
         overflow: hidden;
         height: 3.43rem;
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
      }
      #shopComment{
         width: 4rem;

      }
      #star{}
   }
  }
}
</style>
