<template>
  <div id='dialogCon' v-if='visible'>
    <div id='dialog'>
      <!-- <div> -->
        <loading2  v-if="loading" id='loading'></loading2>
      <!-- </div> -->
      <template v-if="!loading">
        <div id='header'>
          {{title}}
        </div>
        <div id='content'>
          {{content}}
        </div>
        <div id='btn'>
          <div v-for="(one,index) in btns" :key='index' @click="handleClick(one.id)" :style="{'background-color':one.color}">{{one.name}}</div>
        </div>
      </template>

    </div>
  </div>
</template>
<script>
import loading2 from "./loading2.vue";
export default {
  components: {
    loading2
  },
  props: {
    width: { default: 4 },
    height: { default: 4 },
    title: { default: "" },
    content: { default: "" },
    btns: {
      default: function() {
        return [];
      }
    },
    visible: { default: false },
    loading: { default: false }
  },
  methods: {
    handleClick(id) {
      this.$emit(id, this.content);
    }
  }
};
</script>
<style rel="stylesheet/scss" scoped lang="scss">
$orange: rgb(255, 90, 0);

#dialogCon {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgba(129, 129, 129, 0.5);
  #dialog {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: white;
    // padding: 1rem;
    border-radius: 9px;
    width: 90vw;
    height: 30vh;
    #loading{
      margin-top: 7.5vh;
      align-self: center;
      // width: 4rem;
      // height: 4rem;
    }
    #header {
      border-radius: 9px 9px 0 0;
      background-color: $orange;
      color: white;
      padding: 0.4rem;
    }
    #content {
      color: $orange;
      text-align: center;
    }
    #btn {
      display: flex;
      justify-content: flex-end;
      div {
        color: white;
        border-radius: 3px;
        margin: 0.3rem;
        padding: 0.5rem 0.8rem;
        width: 2rem;
      }
    }
  }
}
</style>

