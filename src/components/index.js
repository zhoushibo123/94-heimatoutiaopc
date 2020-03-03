// 公共的js文件完成所有组件的全局注册

import LayoutHeader from './home/layout-header.vue'
import LayoutAside from './home/layout-aside.vue'
export default {
  install: function (Vue) {
    // 注册全局组件的语法
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
  }
}
