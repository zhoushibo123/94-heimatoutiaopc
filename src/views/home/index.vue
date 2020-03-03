<template>
<!-- 外层容器 现在最外层放置一个大容器因为小容器只能放在大容器里 -->
 <el-container>
<el-aside style="width:230px">
  <!-- 侧边栏容器 -->
 <layout-aside></layout-aside>
</el-aside>
<el-container>
<!-- 右侧容器 右侧在嵌套一个el-container-->
<el-header>
  <!-- 顶栏容器 -->
  <layout-header></layout-header>
</el-header>
<!-- 主容器 -->
<!-- <el-main>默认20px内边距 -->
<el-main style="padding: 0px">
  <!-- <h1>主要区域</h1> -->
  <!-- 这里应放置二级路由容器 -->
  <router-view></router-view>
</el-main>
</el-container>
 </el-container>
</template>

<script>
// import LayouAside from '@/components/home/layout-aside'
// import LayouHeader from '@/components/home/layout-header'
export default {
  // components: {
  //   'layout-aside': LayouAside,
  //   'layout-header': LayouHeader
  // }
}
</script>

<style>

</style>
