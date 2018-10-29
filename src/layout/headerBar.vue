<template>
  <div id="headerbar">
    <div id='icon'>
      <div>优设</div>
    </div>
    <div id='menuBtn' @click="openMenu()">
      <div id='lineContainer'>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

    </div>
    <div id="menu"   :class="menuShow?'showMenu':''">
         <div v-for="(oneType,index) in types" :key='index' class="oneType" :class="index==0?'noline':''">
            {{oneType.name}}
         </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "headerBar",
  data() {
    return {
      menuShow:false,
      types:[{name:'科技',url:''},{name:'娱乐',url:''}]
    };
  },
  components: {
  
  },
  methods: {
      openMenu(){
      this.menuShow=!this.menuShow
      console.log('in')
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

#headerbar {
  background-color: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 2.5rem;
  display: flex;
  justify-content: space-between;
  #icon {
    height: 100%;
    font-size: 1.2rem;
    background-color: $orange;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 3rem;
  }
  #menuBtn {
    width: 3rem;
    float: right;
    color: $orange;
    display: flex;
    justify-content: center;
    align-items: center;
    #lineContainer {
      height: 50%;
      width: 1rem;
      display:flex;
      flex-direction: column;
      justify-content: space-between;
      .line {
        // margin-bottom: 1vh;
        width: 1rem;
        border: 1px solid $orange;
      }
    }
  }
}
.showMenu{
   right: 0 !important;
}
#menu{
  transition: right 0.5s;
  // -webkit-transition: right 0.5s; /* Safari */

  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  width: 7rem;
  height: 7rem;
  position: absolute;
  top:2rem;
  right:-10rem;
  box-shadow: 0 0 1px 1px rgb(221, 221, 221);
   
  .oneType{
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem;
    text-align: center;
    color: $orange;
    border-top: 1px dotted $orange;
  }
  .noline{
    border: 0 !important;
  }
}
</style>
