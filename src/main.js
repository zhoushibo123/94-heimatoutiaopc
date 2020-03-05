import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import '@/permission'// 引入权限模块
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less'
import axios from '@/utils/request' // 引入封装的request.js
import Components from '@/components'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui 任何位置都可以使用
Vue.use(Components)// 全局注册

Vue.prototype.$axios = axios // 将axios赋值给Vue全局对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
