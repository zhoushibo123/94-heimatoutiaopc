<template>
  <!-- el-card布局 -->
  <el-card>
    <!-- 放置面包屑  将 面包屑给到卡片的具名header-->
    <bread-crumb slot="header">
      <!-- 具名插槽 template不生成任何实质标签-->
      <template slot="title">素材管理</template>
    </bread-crumb>
    <!-- 上传素材组件借用 el-row布局 -->
    <el-row type="flex" justify="end">
        <!-- 上传组件必须的有一个action属性 可以给一个空字符串 -->
        <!-- 通过多http-request属性绑定一个函数 uploadImg  show-file-list 是否显示已上传文件列表-->
      <el-upload action="" :http-request="uploadImg" :show-file-list="false">
        <!-- 放置一个按钮 -->
        <el-button type="primary" size="small">上传材料</el-button>
      </el-upload>
    </el-row>

    <!-- 放置标签页 v-model绑定的内容就是当前激活的页签 切换tab页签的时需要进行事件的监听-->
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <!--放置标签 name代表页签选中单位值 -->
      <el-tab-pane label="全部素材" name="all">
        <!-- 内容list循环生成 -->
        <div class="img-list">
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 放置图片并且赋值 图片地址 -->
            <img :src="item.url" alt />
            <!-- 操作栏可以flex布局 -->
            <el-row class="operate" type="flex" align="middle" justify="space-around">
              <i class="el-icon-star-on"></i>
              <i class="el-icon-delete-solid"></i>
            </el-row>
          </el-card>
        </div>
      </el-tab-pane>
      <el-tab-pane label="收藏素材" name="collect">
        <!-- 内容 -->
        <div class="img-list">
          <!-- 采用v-for对list数据进行循环 -->
          <el-card class="img-card" v-for="item in list" :key="item.id">
            <!-- 放置图片 并且赋值 图片地址-->
            <img :src="item.url" alt />
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
    <!-- 分页组件 -->
    <el-row type="flex" justify="center" style="height:80px" align="middle">
      <!-- 放置分页组件
              total  总条数
              current-page 当前页码
              page-size 每页多少条
              监听 分页的组件的切换事件
      -->
      <el-pagination
        background
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next"
        @current-change="changePage"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all',
      list: [], // 用来接收全部素材和收藏素材
      page: {
        // 分页的参数通常放在一个独立对象里
        total: 0, // 当前总数
        currentPage: 1,
        pageSize: 4
      }
    }
  },
  methods: {
    //   自定义上传的方法
    uploadImg (params) {
      console.log(params)
      //   params.file就是需要上传的图片文件
      // 接口要求参数是formdata
      const data = new FormData()
      data.append('image', params.file)// 通过append追加参数 第一个参数是参数名称 第二个参数是参数类型
      //   开始发送上传请求
      this.$axios({
        url: '/user/images',
        method: 'post',
        data// data:data es6语法
      }).then(() => {
        this.$message.success('上传成功')
        this.getMaterial()// 拉取
      }).catch(() => {
        this.$message.error('上传失败')
      })
    },
    //   分页切换页码事件在切换页码是执行
    changePage (newPage) {
      this.page.currentPage = newPage // 将新页码赋值给页码变量让其现实当前新页
      this.getMaterial() // 获取数据
    },
    //   获取素材数据
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: this.activeName === 'collect', // 这个位置变活 根据当前页签 获取全部数据  collect的布尔值决定全部还是收藏
          page: this.page.currentPage, // 去页码变量中的值 因为只要页码一变获取的数量就跟着变
          per_page: this.page.pageSize // 获取每页显示数量动态的
        },
        data: {}
      }).then(result => {
        console.log(result)
        this.list = result.data.results
        // 将每页总条数赋值给total变量
        this.page.total = result.data.total_count // 总数  全部素材的总数  收藏素材的总数 总数 跟随 当前页签变化而变化
      })
    },
    // 切换页签是对事件的监听
    changeTab () {
      this.page.currentPage = 1 // 每次切换显示当前项第一页数据
      // 在切换事件中可以通过当前activeName来决定是全部素材还是收藏素材
      // activeName === 'collect'获取收藏素材 activeName === 'all'获取全部素材
      this.getMaterial() // 直接调用获取素材的方法
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.img-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  .img-card {
    width: 220px;
    height: 240px;
    margin: 20px 40px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
    }
    .operate {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      background: #f4f5f6;
      height: 30px;
      i {
        font-size: 20px;
      }
    }
  }
}
</style>
