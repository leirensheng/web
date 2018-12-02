<template>
  <div id="headerbar" :class="hederShow?'':'hide'">
    <div id='icon' @click="goHome()">
      <div>券你省点钱</div>
    </div>

    <div id='menu0'>
      <div @click='$router.push("/home")' class="menu0item">资讯</div>
      <div @click='$router.push("/shop")' class="menu0item">购物</div>
      <div @click='$router.push("/taobao")' class="menu0item">搜索</div>

    </div>
    <!-- <div id='menuBtn' @click="openMenu()">
      <div id='lineContainer'>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

    </div> -->
    <!-- <div id="menu"   :class="menuShow?'showMenu':''">
         <div v-for="(oneType,index) in types" :key='index' class="oneType" :class="index==0?'noline':''">
            {{oneType.name}}
         </div>
    </div> -->
  </div>
</template>

<script>
export default {
  name: "headerBar",
  data() {
    return {
      currentNum: 0,
      hederShow: true,
      menuShow: false,
      types: [{ name: "科技", url: "" }, { name: "娱乐", url: "" }]
    };
  },
  components: {},
  methods: {
    goHome() {
      this.$router.push("/home");
    },
    openMenu() {
      this.menuShow = !this.menuShow;
    },
    handleScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scrollTop < this.currentNum) {
        if (this.hederShow === false) {
          this.hederShow = true;
        }
      } else {
        if (this.hederShow == true && scrollTop > 140) {
          this.hederShow = false;
        }
      }
      this.currentNum = scrollTop;
    }
  },
  mounted() {
    window.addEventListener("scroll", () => {
      window.requestAnimationFrame(this.handleScroll);
    });
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
.hide {
  top: -2.6rem !important;
}
#headerbar {
  z-index: 9999;
  background-color: #fff;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 2.5rem;
  display: flex;
  // justify-content: space-between;
  transition: top 0.5s;
  #icon {
    font-family: "楷体","楷体_GB2312";
    cursor: pointer;
    height: 100%;
    font-size: 1.4rem;
    background-color: $orange;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 8rem;
    text-align: center;
  }
  #menu0 {
    @media (min-width: 760px) {
      div::before {
        content: "";
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 100%;
        border-bottom: 2px solid $orange;
        transition: 0.2s all linear;
      }

      div:hover::before {
        width: 100%;
        top: 0;
        left: 0;
        transition-delay: 0.1s;
        border-bottom-color: $orange;
        z-index: -1;
      }
      div:hover ~ div::before {
        left: 0;
      }
    }

    margin-left: 1rem;
    display: flex;
    div {
      // flex:0;
      position: relative;
      cursor: pointer;
      color: $orange;
      padding: 0.5rem;
      transition: 0.2s all linear;
    }
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
      display: flex;
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
.showMenu {
  right: 0 !important;
}
#menu {
  transition: right 0.5s;
  padding: 1rem;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  width: 7rem;
  height: 7rem;
  position: absolute;
  top: 2rem;
  right: -10rem;
  box-shadow: 0 0 1px 1px rgb(221, 221, 221);

  .oneType {
    font-size: 1.1rem;
    cursor: pointer;
    padding: 1rem;
    text-align: center;
    color: $orange;
    border-top: 1px dotted $orange;
  }
  .noline {
    border: 0 !important;
  }
}
</style>
