<template>
    <div class="article" :class='[0,1].includes(articleIndex)?"noline":""' @click="toggleShowAll()">
        <div class="title" :class="titleAlign=='center'?'titleCenter':''">
            {{articleIndex?articleIndex+'. ':''}}{{article.title}}
            <span @click.stop="addZan()" :class="hasAdd? 'hasAdd':''" class="dianzan" v-if='article.stars||article.stars===0'>
                <i class="icon iconfont icon-weibiaoti-  zan">
                </i>
                <span class="stars">{{article.stars}}</span>
            </span>

        </div>
        <div class="content">
            <span v-if='!showAll&&article.text.length>80'>
                {{article.text.slice(0,80)+'...'}}
            </span>
            <span v-else>
                {{article.text}}
                </span>
        </div>
        <div class="relation" v-show='showAll&&article.text.length>80'>
            <div v-for="(one,index) in article.relations" :key='index' @click="openRelation(one.url)" class="oneRelation">
                <div class="dot"></div>
                <span>{{one.text}}</span>
                <span class="source">{{one.source}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      hasAdd: false,
      showAll: false
    };
  },
  props: {
    titleAlign: {
      type: String,
      default: "left"
    },
    article: {
      type: Object,
      default: {}
    },
    articleIndex: {
      type: Number,
      default: 1
    }
  },
  components: {},
  methods: {
    toggleShowAll() {
      this.showAll = !this.showAll;
    },
    openRelation(url) {
      window.open(url);
    },
    addZan() {
      if (!this.hasAdd) {
        this.hasAdd = true;
        this.article.stars++;
      }
    }
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);
.titleCenter {
  text-align: center !important;
}
.hasAdd {
  color: $orange !important;
}
.noline {
  border-top: 0 !important;
}
.article {
  transition: height 1s;
  padding: 1.2rem 0;
  border-top: 1px dashed rgb(222, 222, 222);
  .title {
    line-height: 2rem;
    font-size: 1.2rem;
    font-weight: bold;
    color: rgb(58, 57, 57);
    padding-bottom: 0.4rem;
    .dianzan {
      cursor: pointer;
      .zan {
        font-size: 1.3rem;
        position: relative;
        top: 1px;
        font-weight: normal;
      }
      .stars {
        font-size: 1rem;
        font-weight: normal;
      }
    }
  }
  .content {
    text-align: justify;

    line-height: 2rem;
    color: rgb(111, 111, 111);
  }
  .relation {
    color: rgb(111, 111, 111);
    margin: 0.4rem 0;
    .oneRelation {
      line-height: 1.7rem;
      margin-bottom: 0.3rem;
      cursor: pointer;
      // :hover:und
      .dot {
        width: 0.2rem;
        height: 0.2rem;
        position: relative;
        top:-0.1rem;
        display: inline-block;
        border-radius: 50%;
        border:2px solid rgb(159,159,159);
        margin-right: 0.5rem;
      }
      .source {
        color: rgb(180, 180, 180);
        // font-style: italic;
        display: inline-block;
        margin-left: 0.5rem;
      }
    }
  }
}
</style>
