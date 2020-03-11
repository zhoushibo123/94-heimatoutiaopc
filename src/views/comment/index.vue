<template>
<!-- 给el-card分页效果做一个懒加载效果 -->
  <el-card v-loading="loading">
    <!-- 放置一个封装好的面包屑组件 -->
    <bread-crumb slot="header">
      <!-- slot="header"是el-card的具名插槽 使用他的样式 -->
      <!-- slot="title"是我们自己封装面包屑的具名插槽 -->
      <template slot="title">评论管理</template>
    </bread-crumb>
    <el-table :data="list">
      <!-- 表格组件 -->
      <!-- 给el-table-column一个formatter属性 用来格式化内容因为table中不显示布尔值 -->
      <el-table-column prop="title" width="600px" label="标题"></el-table-column>
      <el-table-column prop="comment_status" :formatter="formatterBool" label="评论状态"></el-table-column>
      <el-table-column prop="total_comment_count" label="总评论数"></el-table-column>
      <el-table-column prop="fans_comment_count" label="粉丝评论数"></el-table-column>
      <el-table-column label="操作">
        <!-- el-table-column组件在插槽中传出了row $index store column -->
        <!-- 插槽 作用域插槽 子组件中的数据 通过插槽传出slot-scope接受 row行数据 $index索引 -->

        <!-- 可以放组件 按钮组件 -->
        <!-- 定义一个obj来接受 el-table-column通过作用域插槽传出来的row   comment_status是数据里的状态-->
        <template slot-scope="obj">
          <el-button size="small" type="text">修改</el-button>
          <el-button @click="oppenOrClose(obj.row)" size="small" type="text">{{obj.row.comment_status? '关闭' : '打开'}}评论</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 放置分页组件 -->
    <el-row  style="height:80px" type="flex" align="middle" justify="center">
      <!--
        分页组件需要  动态的数据  在data中定义变量
        total 当前的总数
        current-page 当前的页码
        page-size 每页多少条
        监听current-change事件 就是点击对应的页码发生改变事件 elementui内置事件
       -->
       <el-pagination background layout="prev,pager,next"
       :current-page="page.currentPage"
       :total="page.total"
       :page-size="page.pageSize"
       @current-change="changePage"
       >

       </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 分页参数单独放置一个对象
      page: {
        total: 0, // 总数默认是0
        currentPage: 1, // 默认页显示第一页
        pageSize: 10// 默认当前页显示10条数据
      },
      list: [],
      loading: false// 控制loading遮罩层显示/隐藏
    }
  },
  methods: {
    // 页码改变事件
    changePage (newPage) {
      // newPage是最新的页码
      // 把最新页码设置给page当前的页码 进行赋值
      this.page.currentPage = newPage
      // 重新拉取数据
      this.getComment()
    },
    async getComment () {
      this.loading = true // 打开遮罩层
      const result = await this.$axios({
        // 接口如果不传分页数据默认就是第一页数据
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment', // 此参数用来控制获取数据类型
          page: this.page.currentPage, // 此参数用来 查找对应页码
          per_page: this.page.pageSize// 用来查找10条数据
        }
        /* query参数应该在哪个位置传参axios？
        parmas传get参数也就是query参数
        data 传body参数也就是请求体参数
        */
      })

      // 将返回结果中的数组复制个list空数组
      this.list = result.data.results
      // 将返回结果中的总数赋值给total
      this.page.total = result.data.total_count
      this.loading = false // 请求完毕关闭遮罩层
    },
    formatterBool (row, column, cellValue, index) {
      // 定义一个格式化函数
      /* row 代表当前的一行数据
      column 代表当前的列信息
        cellValue 代表当前交叉单元格的值
        idnex 代表当前索引
        // 该函数需要返回一个值 用来显示
      */
      return cellValue ? '正常' : '关闭'
    },
    // 打开或者关闭的逻辑
    oppenOrClose (row) {
      // 如果状态是正常那么就显示关闭评论 如果状态是关闭就显示关闭评论
      const mess = row.comment_status ? '关闭' : '打开'
      this.$confirm(`是否${mess}评论`, '提示').then(async () => {
        try {
          // 调用打卡或者关闭接口
          await this.$axios({
            url: '/comments/status', // 请求地址
            method: 'put', // 方式
            // query参数
            params: {
            // // 为什么评论会失败 就是因为 原来 给你传了 9152 你回传了 9200
            // 所以我们用大数字包 保证 9152不被转化 就可以使用原来的功能
            //  // 前端传字符串到后端 只要和原数字一致  后端会自动将字符串转成大数字
            // 只需要保证 id 和传过来的id一致就行
              article_id: row.id.toString()// 要求参数的文章id  将大数字BIGnumber转成字符串
            },
            data: {
            // body参数
              allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
            }
          })
          // 成功了 重新拉去数据
          this.$message.success(`${mess}评论成功`)
          this.getComment()
        } catch (error) {
          // 失败进入catch
          this.$message.error(`${mess}评论失败`)
        }
      })
    }
  },
  created () {
    //   在钩子函数中 直接获取数据
    this.getComment()
  }
}
</script>

<style>
</style>
