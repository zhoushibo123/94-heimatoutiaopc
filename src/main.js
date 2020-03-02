import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'
import axios from 'axios' // 引入axios
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui 任何位置都可以使用
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置共公的请求地址
Vue.prototype.$axios = axios // 将axios赋值给Vue全局对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
