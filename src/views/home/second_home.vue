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
      list: ['https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583244693190&di=00aca4b3acc5a59f35383edb75703a14&imgtype=0&src=http%3A%2F%2Fimg.shu163.com%2Fuploadfiles%2Fsc%2F2010%2F7%2F2010071101362964.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583244760260&di=ead2e3d5f805e5a086cb8a26794fcc7c&imgtype=0&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F03%2F28%2F84%2F5b7d553f3cb0e_610.jpg',
        'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2508838718,3052579880&fm=26&gp=0.jpg',
        'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583244760257&di=95dfbbae237be99cee5058cbe384e7b3&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F013a6658d8774ca801219c7762c3d7.jpg%401280w_1l_2o_100sh.jpg']
    }
  }
}
</script>

<style>
.second-home{
   /* calc 计算的意思 在css中计算数值 用法  calc ( 四则运算  ) 变量之间 和运算符之间一定要有空格 */
height: calc(100vh - 60px);
background-size: cover;
background-image: url('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1583243613562&di=c2e755ae884bfd8a24aa378348fcf032&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201305%2F12%2F20130512181858_ujRin.jpeg');
}
</style>
