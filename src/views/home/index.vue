<template>
<!-- 外层容器 现在最外层放置一个大容器因为小容器只能放在大容器里 -->
 <el-container>
<!-- <el-aside :style="{width: collapse ? '230px':'64px'}" style="background:#2e2f32"> -->
 <el-aside :style="{width: collapse ? '64px' : '230px'}"  style="transition:all 0.5s; background:#2e2f32">
  <!-- 侧边栏容器 -->
 <layout-aside :collapse="collapse"></layout-aside>
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
import eventBus from '@/utils/eventBus' // 公共领域监听
export default {
  data () {
    return {
      collapse: false// 展开状态
    }
  },
  created () {
    // 切换了折叠的状态
    eventBus.$on('changeCollapse', () => {
      // 此时折叠状态一定变了 一定跟当前状态相反
      this.collapse = !this.collapse // 只取反就和头部的组件的状态同步了
    })
  }
  // components: {
  //   'layout-aside': LayouAside,
  //   'layout-header': LayouHeader
  // }
}
</script>

<style>

</style>
