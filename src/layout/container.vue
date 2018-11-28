<template>
  <div id="container">
    <header-bar></header-bar>

    <keep-alive>
      <router-view
        id='content'
        v-if="$route.meta.keepAlive"
      ></router-view>
    </keep-alive>
    <router-view
      id='content'
      v-if="!$route.meta.keepAlive"
    ></router-view>

    <footer-bar></footer-bar>
  </div>
</template>

<script>
import headerBar from "./headerBar.vue";
import footerBar from "./footerBar.vue";

export default {
  name: "layoutContainer",

  data() {
    return {};
  },
  components: {
    headerBar,
    footerBar
  },
  methods: {
  }
};
</script>

<style rel="stylesheet/scss" scoped lang="scss">
#container {
  // background-color: grey;
  // display: flex;
  // flex-direction: column;
  #content {
    min-height: 90vh;
    // flex: 1 0 auto;
    margin-top: 2.5rem;
    // flex: 1;
  }
}
</style>
