import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import router from './router';  // router保持小写，大写会出错误

Vue.config.productionTip = false
Vue.use(ElementUI); // , { size: 'small' }

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
