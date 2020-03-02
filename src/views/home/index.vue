<template>
<!-- 外层容器 现在最外层放置一个大容器因为小容器只能放在大容器里 -->
 <el-container>
<el-aside>
  <!-- 侧边栏容器 -->
  <h1>左侧导航</h1>
</el-aside>
<el-container>
<!-- 右侧容器 右侧在嵌套一个el-container-->
<el-header>
  <!-- 顶栏容器 -->
  <h1>头部容器</h1>
</el-header>
<!-- 主容器 -->
<el-main>
  <h1>主要区域</h1>
  <!-- 这里应放置二级路由 -->
  <router-view></router-view>
</el-main>
</el-container>
 </el-container>
</template>

<script>
export default {

}
</script>

<style>

</style>
