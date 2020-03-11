<template>
  <!-- 二级路由容器 -->
  <div class="second-home">
<!-- 幻灯片  组件-->
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in list" :key="item">
         <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
    <!-- 放置图表组件 -->
    <div ref="myChart" class="charts"></div>
  </div>
</template>

<script>
import ECharts from 'echarts' // 引入图表模块
// 图表本身使用camcas实现的
export default {
  mounted () {
    // 进行ECharts实例化  init  ECharts内置方法
    this.myChart = ECharts.init(this.$refs.myChart)// 实例化  得到图表的一个实例化对象
    // this.myChart就是图表对象
    this.myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      }]
    })
  },
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
.charts{
  width: 600px;
  height: 400px;
  // background-color: rosybrown;

}
}
</style>
