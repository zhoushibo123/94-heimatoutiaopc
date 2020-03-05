<template>
  <el-card>
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
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      list: []
    }
  },
  methods: {
    getComment () {
      this.$axios({
        url: '/articles', // 请求地址
        params: {
          response_type: 'comment' // 此参数用来控制获取数据类型
        }
        /* query参数应该在哪个位置传参axios？
        parmas传get参数也就是query参数
        data 传body参数也就是请求体参数
        */
      }).then(result => {
        console.log(result)
        // 将返回结果中的数组复制个list空数组
        this.list = result.data.results
      })
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
      this.$confirm(`是否${mess}评论`, '提示').then(() => {
        // 调用打卡或者关闭接口
        this.$axios({
          url: '/comments/status', // 请求地址
          method: 'put', // 方式
          // query参数
          params: {
            article_id: row.id// 要求参数的文章id
          },
          data: {
            // body参数
            allow_comment: !row.comment_status // 是打开还是关闭  此状态和评论状态相反
          }
        }).then(() => {
          // 成功了 重新拉去数据
          this.$message.success(`${mess}评论成功`)
          this.getComment()
        }).catch(() => {
          // 失败进入catch
          this.$message.error(`${mess}评论失败`)
        })
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
