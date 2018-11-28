<template>
  <div class="detailContain">
    <div id='mainPic'>
      <img
        :src="data.pict_url"
        alt=""
      >
    </div>
    <div
      id='desc'
      v-if="data.pict_url"
    >
      <!-- <div class="row"> -->
      <div id='top'>
        <span id='mall'>{{item.mall}}</span>
        <span id='title'>{{data.title}}</span>
      </div>

      <!-- </div> -->
      <div id="bottom">
        <div>{{data.nick}}</div>
        <div>月销{{data.volume}}</div>
        <div>{{data.provcity}}</div>
      </div>
    </div>
    <div id='detailImgs'>
      <div
        v-for="(one,index) in data.small_images"
        :key="index"
      >
        <img
          :src="one"
          alt=""
        >

      </div>
    </div>
    <div
      id='fixBottom'
      v-if="data.pict_url"
    >
      <div
        id='back'
        @click="back"
      >返回</div>
      <div id='price'>券后价 {{item.finalPrice}}元</div>
      <div
        id='shop'
        @click="shop"
      >领券购买</div>
    </div>
    <taokouling
      @reset='handleReset'
      :url="taokouling.url"
      :logoUrl='taokouling.logoUrl'
      :text="taokouling.text"
    ></taokouling>
  </div>
</template>

<script>
import taokouling from "../components/taokouling.vue";
import { getUaSource } from "../support/util";
export default {
  components: {
    taokouling
  },
  data() {
    return {
      taokouling: {
        text: "",
        url: "",
        logoUrl: ""
      },
      data: "",
      item: ""
    };
  },
  methods: {
      handleReset(){
      this.taokouling.url=this.taokouling.logoUrl=this.taokouling.text=''
    },
    shop() {
      let source = getUaSource(window.navigator.userAgent);
      if (source === "weixin") {
        this.taokouling.url = this.item.url;
        this.taokouling.logoUrl = this.item.pic;
        this.taokouling.text = this.data.title;
      } else {
        window.open(this.item.url);
      }
    },
    back() {
      this.$router.back();
    },
    getDetail(id) {
      this.$ajax({
        url: `/tbDetail?id=${id}`,
        method: "get",
        timeout: 5000
      })
        .then(res => {
          this.data = res.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getDetail(this.$route.query.id);
    this.item = JSON.parse(sessionStorage.getItem("item"));
    //  console.log()
  }
};
</script>

<style  rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
.detailContain {
  background-color: rgb(240, 240, 240);
}
#desc {
  padding: 1rem;
  background-color: white;
  margin: 0.7rem 0;
  #top {
    // display: flex;
    #mall {
      background-color: red;
      border-radius: 0.2rem;
      // width: 5rem;
      color: white;
      padding: 0.1rem 0.2rem;
      display: inline-block;
      margin-right: 0.3rem;
    }
    #title {
      // display: inline-block;
      font-weight: bold;
      height: 3rem;
      overflow: hidden;
      line-height: 1.5rem;
    }
  }
  #bottom {
    color: rgb(124, 114, 114);
    margin-top: 0.6rem;
    display: flex;
    justify-content: space-between;
  }
}
#mainPic {
  img {
    width: 100%;
  }
}
#detailImgs {
  img {
    width: 100%;
  }
  margin-bottom: 2.5rem;
}
#fixBottom {
  // height: 2rem;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: white;
  box-sizing: border-box;
  padding: 0.6rem;
  display: flex;
  justify-content: space-between;
  div {
    border-radius: 0.7rem;
    padding: 0.4rem 1rem;
    color: white;
  }
  #back {
    background-color: $orange;
    cursor: pointer;
  }
  #price {
    color: $orange;
    font-size: 1.2rem;
  }
  #shop {
    background-color: red;
    cursor: pointer;
  }
}
</style>

