<template>
  <div id="home">
    <div id='top'>
      <div id='webName'>i简报</div>
      <div id='webIntro'>每天3分钟互联网简报</div>
      <!-- <img src="https://image.uisdc.com/wp-content/uploads/2018/06/top-banner-news-summer.jpg" alt=""> -->
    </div>
    <div id='loadingWrap' v-if='!records.length'>
      <loading id='loading'></loading>
    </div>

    <div id='oneDay' v-for='(oneDay,index1) in records' :key='index1'>
      <div v-if='oneDay.type=="article"'>
        <div id='dateRow'>
          <span id='left'>
            {{checkDate(oneDay.date)}} {{oneDay.date}}
          </span>
          <span id='right'> {{oneDay.weekDay}}</span>
        </div>
        <div>
          <message v-for='(article,index) in oneDay.data' :key='index' :article='article' :articleIndex='index+1'></message>
        </div>
      </div>
      <div v-else-if='oneDay.type=="ad"'>
        <advertise :ad='oneDay.data'></advertise>
      </div>
    </div>

    <div id="loadMoreContainer" v-if="records.length">
      <div id='loadMore' @click="loadMore" v-if='!loading&&loadingTime>=3'>
        <i class="el-icon-more"></i>
        <span>加载更多</span>
      </div>
      <loading2 v-if='loading' id='btnLoading'></loading2>
    </div>

  </div>
</template>

<script>
import { ajax } from "../support/ajax.js";
import {
  getWeekDay,
  checkDate,
  getWindowHeight,
  getDocumentTop,
  getScrollHeight
} from "../support/util";
import message from "../components/message.vue";
import loading from "../components/loading.vue";
import loading2 from "../components/loading2.vue";
import advertise from "../components/advertise";
const BASEURL =
  process.env.NODE_ENV === "production"
    ? "http://13.59.242.158:7001"
    : "http://192.168.0.105:7001";

export default {
  data() {
    return {
      loading: false,
      loadingTime: 0,
      documentHeight: "",
      winHeight: getWindowHeight(),
      days: [],
      lastId: "",
      records: []
      //  [
      //   {
      //     type: "article",
      //     date: "2018-10-27",
      //     weekDay: "星期六",
      //     data: [
      //       {
      //         title: "《荒野大镖客 救赎 2》正式发售，大获好评",
      //         stars: 4,
      //         relations: [
      //           {
      //             text: "这款由Rockstar 花费 7 年时间这款由",
      //             url: "www.baidu.com",
      //             source: "新浪科技"
      //           }
      //         ],
      //         text:
      //           "这款由Rockstar 花费 7 年时间，这款由Rockstar 花费 7 年时间这款由Rockstar 花费 7 年时间这款由Rockstar 花费 7 年时间开发资源比《侠盗猎车手 5》高 3 倍，光故事剧本厚达 2000 页的游戏刚刚发售，就预定了2018 年年度最佳游戏。设计师们周末在家可以玩起来了！"
      //       },
      //       {
      //         title: "《荒野大镖客 救赎 2》正式发售，大获好评",
      //         stars: 4,
      //         text: "这剧本厚达 2000以玩起来了！"
      //       }
      //     ]
      //   },
      //   {
      //     type: "article",
      //     date: "2018-10-26",
      //     weekDay: "星期五",
      //     data: [
      //       {
      //         title: "《荒野大镖客 救赎 2》正式发售，大获好评",
      //         stars: 4,
      //         text:
      //           "这款由Rockstar 花费 7 年时间，开发资源比《侠盗猎车手 5》高 3 倍，光故事剧本厚达 2000 页的游戏刚刚发售，就预定了2018 年年度最佳游戏。设计师们周末在家可以玩起来了！"
      //       },
      //       {
      //         title: "《荒野大镖客 救赎 2》正式发售，大获好评",
      //         stars: 4,
      //         text:
      //           "这款由Rockstar 花费 7 年时间，开发资源比《侠盗猎车手 5》高 3 倍，光故事剧本厚达 2000 页的游戏刚刚发售，就预定了2018 年年度最佳游戏。设计师们周末在家可以玩起来了！"
      //       }
      //     ]
      //   },
      //   {
      //     type: "ad",
      //     data: {
      //       title: "零基础自助建站",
      //       image:
      //         "https://image.uisdc.com/wp-content/uploads/2018/08/uisdc-db-banner0831.jpg",
      //       text: "一千套行业魔板，零基础也能自己建网站，1小时快速上线"
      //     }
      //   }
      // ]
    };
  },
  components: {
    message,
    advertise,
    loading,
    loading2
  },
  methods: {
    initData() {
      ajax({
        methods: "get",
        url: BASEURL + "/getNews?length=5"
      })
        .then(resData => {
          this.handleData(resData);
        })
        .catch(e => {})
        .then(() => {
          this.bindEvent();
        });
    },
    checkDate,
    handleData(data, isFirstInit) {
      data.forEach(one => {
        one.date = one.realDate.split(" ")[0];
      });
      let curDays = [...new Set(data.map(one => one.date))];

      for (let one of curDays) {
        console.log(this.days, one);
        if (this.days.includes(one)) {
          let target = this.records.find(oneDay => oneDay.date === one);
          target.data.push(
            ...data.filter(oneAritcle => oneAritcle.date === one)
          );
        } else {
          var obj = {
            type: "article",
            date: one,
            weekDay: getWeekDay(new Date(one)),
            data: data.filter(oneAritcle => oneAritcle.date === one)
          };
          this.days.push(one);
          this.records.push(obj);
        }
      }

      if (this.days.length) {
        this.lastId = this.records.slice(-1)[0].data.slice(-1)[0].id;
      }
    },

    loadMore() {
      this.loading = true;
      this.loadingTime++;
      ajax({
        url: BASEURL + "/getNews?length=10&lastId=" + this.lastId,
        method: "get"
      })
        .then(resData => {
          this.handleData(resData);
        })
        .catch(() => {})
        .then(() => {
          this.loading = false;
        });
    },
    bindEvent() {
      window.addEventListener("scroll", () => {
        window.requestAnimationFrame(() => {
          if (getScrollHeight() <= this.winHeight + getDocumentTop() + 7) {
            if (this.loadingTime <= 2&&!this.loading) {
              this.loadMore();
            }
          }
        });
      });
    }
  },
  mounted() {
    this.initData();
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
#loadingWrap {
  display: flex;
  justify-content: center;
  #loading {
    // background-color: white
  }
}
#top {
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  #webName {
    font-family: "Microsoft YaHei";
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem;
  }
  img {
    width: 100%;
  }
}
#oneDay {
  margin-bottom: 1.5rem;
  padding: 1.4rem;
  background: white;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.1);
  #dateRow {
    color: $orange;
    font-weight: bold;
    text-align: center;
    padding: 0.8rem;
    #left {
      font-size: 1.1rem;
      padding: 0.5rem;
      display: inline-block;
      border: 1px solid $orange;
      border-radius: 4px;
    }
    #right {
      font-size: 1.2rem;
    }
  }
}
#loadMoreContainer {
  // position: relative;
  // top:-0.3rem;
  // background-color: $orange;
  // padding: 3rem;
  display: flex;
  justify-content: center;
  padding: 0 0.7rem;
  margin-bottom: 1rem;
  #btnLoading {
    //  height: 2rem;
  }
  #loadMore {
    padding: 1.3rem;
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
    //
  }
}
</style>
