import Vue from "vue";
import App from "./App.vue";
// import ElementUI from "element-ui";
import router from "./router";  // router保持小写，大写会出错误
import "./assets/iconfont/iconfont.css";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
// Vue.use(ElementUI); // , { size: 'small' }

new Vue({
    router,
    render: h => h(App)
}).$mount("#app");
