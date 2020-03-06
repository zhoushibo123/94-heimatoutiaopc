<template>
  <!-- 二级路由容器 -->
  <div class="second-home">
<!-- 幻灯片  组件-->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: ['http://p3.img.cctvpic.com/photoAlbum/page/performance/img/2019/10/29/1572347589578_536.gif',
        'http://p1.img.cctvpic.com/photoAlbum/page/performance/img/2019/2/27/1551233165199_138.gif',
        'http://p2.img.cctvpic.com/photoAlbum/page/performance/img/2019/2/25/1551064271532_809.gif',
        'http://p4.img.cctvpic.com/photoAlbum/page/performance/img/2019/7/4/1562210946800_587.gif']
    }
  }
}
</script>

<style lang="less" scoped>
.second-home{
   /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
height: calc(100vh - 60px);
background-size: cover;
background-image: url('https://med.sina.com/files/20200304/jpg/20200304110453680.jpg');
img{
  width: 100%;
  height: 100%;
}
}
</style>
