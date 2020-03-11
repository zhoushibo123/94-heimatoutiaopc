<template>
   <!-- 处理上传素材和选择素材封面 el-tabs -->
  <el-tabs v-model="activeName">
      <el-tab-pane label="素材库" name="material">
          <!-- 循环遍历list数据 -->
          <div class="select-image-list">
              <el-card class="image-card" v-for="item in list" :key="item.id">
                  <!-- 显示图片素材 -->
                  <!-- 注册点击事件把地址传给上层容器显示 -->
                  <img @click="clickImg(item.url)" :src="item.url" alt="">
              </el-card>
          </div>
   <!-- 分页 -->
        <el-row type='flex' justify="center" style="height:80px" align="middle">
               <!-- 分页组件 -->
               <!-- layout特别注意 名字不能写错 写错全死了 -->
               <el-pagination background  layout="prev, pager, next"
               :total="page.total"
               :current-page="page.currentPage"
               :page-size="page.pageSize"
               @current-change="changePage"
               ></el-pagination>
        </el-row>
      </el-tab-pane>
       <el-tab-pane label="上传素材" name="upload">
         <!-- 放置一个上传组件 -->
      <!-- action必须给值 否则会报错http-request 自定义上传 -->
      <el-upload action="" class='upload-img' :http-request="uploadImg">
        <!-- 放置一个元素 用来点击上传 -->
        <i class='el-icon-plus'> </i>
      </el-upload>
       </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'material', // 当前激活的页签
      list: [], // 素材列表数据
      page: {
        currentPage: 1,
        pageSize: 8,
        total: 0
      }
    }
  },
  methods: {
    // 点击图片时触发
    clickImg (url) {
      // 接收一个参数 要将参数传给上层组件
      // 在脚手架中大小写自定义事件名大小写都可以
      this.$emit('selectOneImg', url)// 将URL参数传出去
    },
    //   页码改变事件
    changePage (newPage) {
      this.page.currentPage = newPage
      this.getAllImg()
    },
    //   获取全部素材的方法
    getAllImg () {
      this.$axios({
        url: '/user/images',
        params: {
          cellect: false, // 全部素材为false ture为收藏素材
          page: this.page.currentPage,
          per_page: this.page.pageSize
        }
      }).then(result => {
        // console.log(result)
        this.list = result.data.results// 获取全部素材的数据
        this.page.total = result.data.total_count
      })
    },

    // 上传素材
    uploadImg (params) {
      // 调用上传接口
      //  params.file 就是需要上传的图片文件
      // 接口参数类型要求是 formData
      const data = new FormData() // 实例化一个formData对象
      data.append('image', params.file) // 加入文件参数
      // 开始发送上传请求了
      this.$axios({
        url: '/user/images', // 请求地址
        method: 'post', // 上传或者新增一般都是post类型
        data // es6简写
      }).then(result => {
        // 如果成功了  此时 我们的接口会返回给我们一个上传成功之后的图片地址
        // 拿到了返回的url地址 应该做什么
        // 根刚才一样 往外传
        this.$emit('selectOneImg', result.data.url) // 将url参数传出去
      }).catch(() => {
        this.$message.error('上传素材失败')
      })
    }
  },
  created () {
    this.getAllImg()// 获取全部素材的数据
  }
}
</script>

<style lang="less" scoped>
.select-image-list{
    display: flex;
    flex-wrap: wrap;//换行
    justify-content: space-around;//左右间隔距离
    .image-card{
        width: 150px;
        height: 150px;
        margin: 20px 0;
        img{
            width: 100%;
            height: 100%;
        }
    }
}
.upload-img {
  display: flex;
  justify-content: center;
  i {
    font-size: 20px;
    padding: 50px;
    border:2px dashed #ccc;
    border-radius: 4px;
  }
}
</style>
