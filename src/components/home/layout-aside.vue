<template>
  <div class="layout-aside">
      <!-- 头部图片 -->
      <div class="title">
           <!-- 如果img是动态的 你需要把地址转变成变量 -->
         <!-- 如果是折叠 用小图 如果是展开 用大图 -->
         <img :src="collapse ? smallImg : bigImg" alt="">
      </div>
      <!-- 导航菜单  直接写router即可开启路由模式  完整写法 :router="true"-->
      <el-menu :collapse="collapse" router background-color="#323745" text-color="#abafb5">
          <!-- 子菜单 -->
          <!-- 两个没有子菜单的 -->
          <el-menu-item index="/home">
              <i class="el-icon-delete-solid"></i>
              <span>首页</span>
          </el-menu-item>
          <!-- 二级菜单  使用<el-menu-item>-->
          <el-submenu index='1'>
              <template slot="title">
              <i class="el-icon-mouse"></i>
              <span >内容管理</span>
              </template>
              <!-- 匿名插槽是二级菜单  具名插槽是一级菜单 -->
           <el-menu-item index="/home/publish">发布文章</el-menu-item>
           <el-menu-item index="/home/articles">内容列表</el-menu-item>
           <el-menu-item index="/home/comment">评论列表</el-menu-item>
           <el-menu-item index="/home/material">素材管理</el-menu-item>
          </el-submenu>
           <!-- 二级菜单 -->
          <!-- <el-submenu index='2' >
               <template slot="title">
              <i class="el-icon-video-camera-solid"></i>
              <span >粉丝管理</span>
                </template> -->
              <!-- 匿名插槽是二级菜单  具名插槽是一级菜单
           <el-menu-item index="/home/picture">图文数据</el-menu-item>
           <el-menu-item index="/home/fansinfo">粉丝概况</el-menu-item>
           <el-menu-item index="/home/fansphoto">粉丝画像</el-menu-item>
           <el-menu-item index="/home/fanslist">粉丝列表</el-menu-item> -->
          <!-- </el-submenu> -->
          <!-- 一级导航没有子菜单 -->
          <el-menu-item index='/home/account'>
              <i class="el-icon-delete"></i>
              <span>账户信息</span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
  props: ['collapse'], // 接受父组件传出来的变量
  data () {
    return {
      bigImg: require('../../assets/img/logo_admin.png'),
      smallImg: require('../../assets/img/toutiao.png')
    }
  }
}
</script>

<style lang='less' scoped>
.layout-aside{
    background-color: #2e2f32;
    height: 100vh;
    // width: 230px;
    .title{
        text-align: center;
        padding: 10px 0;
        img{
            height: 35px;
        }
    }
    .el-menu{
        border-right: none;
    }
}
</style>
