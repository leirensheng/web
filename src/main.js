import Vue from "vue";
import App from "./App.vue";
// import ElementUI from "element-ui";
import router from "./router";  // router保持小写，大写会出错误
import "./assets/css/reset.scss";
import "./assets/iconfont/iconfont.css";
// import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
// Vue.use(ElementUI); // , { size: 'small' }

new Vue({
    router,
    render: h => h(App),
    mounted () {
        document.dispatchEvent(new Event("render-event"));
    }
}).$mount("#app");
