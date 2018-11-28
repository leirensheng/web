<template>
  <div id="app" data-server-rendered="true">
    <router-view ></router-view>
  </div>
</template>

<script>
export default {
  name: "app",
  methods:{
    fontSize(){
            var deviceWidth=document.documentElement.clientWidth>768?768:document.documentElement.clientWidth;
            document.documentElement.style.fontSize=(deviceWidth/25)+"px";
    }
  },
  created(){
     window.onresize=this.fontSize();
  }
};

       
</script>

<style rel="stylesheet/scss"  lang="scss">
$orange: rgb(255, 90, 0);

#app {
}
</style>
