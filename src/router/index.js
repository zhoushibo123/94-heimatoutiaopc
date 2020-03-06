import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Home from '@/views/home' // 用简单方式替换原有
import Login from '@/views/login'// 用简单方式替换原有
import SecondHome from '@/views/home/second_home'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/home'
},
{
  path: '/home',
  name: 'Home',
  component: Home, // 在一节路由表下children配置二级路由表
  children: [{
    path: '', // 二级路由的path 什么都不写  代表二级路由的默认组件 如果a=>/home/a 如果什么都不写  /home
    component: SecondHome // 注册组件
  }, {
    //   path:'/home/comment', // 完整地址 评论列表的地址
    path: 'comment', // 简写地址
    component: () => import('@/views/comment')// 按需加载的方式
  }, {
    path: '/home/material', // 素材管理二级路由
    component: () => import('@/views/material')
  }

  ]
}, {
  path: '/login',
  component: Login,
  name: 'Login'
}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
