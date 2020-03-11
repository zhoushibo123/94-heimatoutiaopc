// 公共的js文件完成所有组件的全局注册

import LayoutHeader from './home/layout-header.vue'
import LayoutAside from './home/layout-aside.vue'
import BreadCrumb from './common/bread-crumb.vue'
import VueQuillEditor from 'vue-quill-editor'// 富文本编辑器
import CoverImage from './publish/cover-image.vue'// 引入封面组件
import SelectImage from './publish/select-image.vue'// 处理上传素材和选择素材封面

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    // 注册全局组件的语法
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)// 面包屑组件的注册
    // 注册 富文本编辑器
    Vue.use(VueQuillEditor)
    // 注册封面组件
    Vue.component('cover-image', CoverImage)
    // 处理上传素材和选择素材封面
    Vue.component('select-image', SelectImage)
  }
}
