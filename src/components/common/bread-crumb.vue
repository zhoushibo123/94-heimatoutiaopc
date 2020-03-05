<template>
<el-breadcrumb separator=">">
    <!-- 面包屑组件  设置分隔符   to 相当于导航里的to-->
    <el-breadcrumb-item to="/home">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
        <!-- 第二个选项是动态的  需要采用传值的方式传进来 props传值 slot插槽 -->
        <!-- 内容是动态的 -->
        <!-- 定义一个具名插槽 挖坑-->
        <slot name="title"></slot>
    </el-breadcrumb-item>
</el-breadcrumb>
</template>

<script>
export default {

}
</script>

<style>

</style>
