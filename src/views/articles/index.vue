<template>

 <el-card class="articles">
      <bread-crumb slot='header'>
          <template slot='title'>文章列表</template>
      </bread-crumb>
      <el-form style="padding-left:50px">
          <!-- 表单容器 -->
          <!-- 放置单选框组 -->
           <el-form-item  label="文章状态:">
               <el-radio-group  v-model="searchForm.status">
             <!-- 单选框选项  label值表示该选项对应的值-->
             <!-- :label的意思是后面值不会加引号 -->
              <!-- 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，不传为全部 / 先将 5 定义成 全部 -->

             <el-radio :label="5">全部</el-radio>
             <el-radio :label="0">草稿</el-radio>
             <el-radio :label="1">待审核</el-radio>
             <el-radio :label="2">审核通过</el-radio>
             <el-radio :label="3">审核失败</el-radio>
           </el-radio-group>
           </el-form-item>
           <el-form-item label="频道类型:">
               <!-- 选择器 -->
               <el-select placeholder="请选择频道"  v-model="searchForm.channel_id">
                   <!-- 下拉选项 应该通过接口来获取数据 -->
             <!-- el-option是下拉的选项 label是显示值  value是绑定的值 -->
             <el-option v-for="item in channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
               </el-select>
           </el-form-item>
           <el-form-item label="日期范围:">
               <!-- 日期范围选择组件 type为daterange -->
                    <el-date-picker type="daterange" value-format="yyyy-MM-dd" v-model="searchForm.dateRange">

                   </el-date-picker>
           </el-form-item>
      </el-form>
      <!-- 文章的主体结构 -->
      <el-row type="flex" align="middle" class="total">
          <span>共找到1000条符合条件的内容</span>
      </el-row>
      <!-- 列表内容 -->
      <div class="article-item" v-for="item in list" :key="item.id.toString()">
          <div class="left">
               <!-- 设置文章的封面信息 有的数组有值 有的没值 搞一个默认值 -->
               <!-- <img src="../../assets/img/default.gif" alt=""> -->
              <!--  采用变量的形式 赋值 -->
             <img :src=" item.cover.images.length ?  item.cover.images[0] : defaultImg" alt="">
              <div class="info">
                  <span>{{item.title}}</span>
                 <!-- 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除 -->
               <!-- 只是改变显示的格式 可以用过滤器   两个过滤器 分别处理   显示文本 和 标签类型-->
               <el-tag :type=" item.status | filterType" class='tag'>{{  item.status  | filterStatus}}</el-tag>
                  <span class="date">{{ item.pubdate }}</span>
              </div>
          </div>
          <div class="right">
            <!-- 方法一事件绑定 -->
           <!-- <span @click="toPublish"><i class="el-icon-edit"></i> 修改</span> -->
           <!-- 方法二  事件直接跟逻辑-->
            <span @click="$router.push(`/home/publish/${item.id.toString()}`)"><i class="el-icon-edit"></i> 修改</span>
           <!-- 删除需要传id 还要考虑是不是大数字类型把对象转成字符串 -->
           <span @click="delMaterial(item.id.toString())"><i class="el-icon-delete"></i> 删除</span>
         </div>
      </div>
      <!-- 放置分页组件 -->
      <el-row type="flex" justify="center" align="middle" style='height:80px'>
        <!-- 分页组件 -->
        <el-pagination
        :current-page="page.currentPage"
        :page-size="page.pageSize"
        :total="page.total"
        @current-change="changePage"
        background layout="prev,pager,next"
        >

        </el-pagination>
      </el-row>
  </el-card>
</template>

<script>
import { getChannels } from '@/api/channels'
export default {
  data () {
    return {
      page: {
        total: 0,
        pageSize: 10,
        currentPage: 1
      },
      // 定义一个表单数据对象
      searchForm: {
        // 数据
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部 / 先将 5 定义成 全部
        // 传值的是时候如果是5 就不传
        status: 5, // 默认为全部的状态
        channel_id: null, // 表示没有任何的频道
        dateRange: [] // 日期范围
      },
      channels: [], // 专门来接收频道的数据是数组
      list: [], // 专门接受评论数据
      defaultImg: require('../../assets/img/melo.gif') // 地址对应的文件变成了变量 在编译的时候会被拷贝到对应位置
    }
  },
  // 监听data中的数据变化  第二种解决方案  watch监听对象的深度检测方案
  watch: {
    searchForm: {
      deep: true, // 固定写法 表示会深度检测searchForm中的变化
      // handler也是固定语法 一旦数据发生任何变化 就会触发更新
      handler () {
        //  统一调用改变条件的 方法
        this.page.currentPage = 1// 只要条件变化  就变成第一页 改变分类
        this.changeCondition()// this指向当前组件实例
      }
    }
  },

  // 专门处理显示格式的
  filters: {
    // 过滤器的第一个参数是value
    // 文章状态 0-草稿，1-待审核，2-审核通过，3-审核失败
    filterStatus (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2 :
          return '已发表'
        case 3:
          return '审核失败'
      }
    },
    // 过滤器除了用在 插值表达中还可以用 v-bind 的表达式中
    filterType (value) {
      // 根据当前状态的值 显示不同类型的tag标签
      switch (value) {
        case 0:
          return 'warning' // 草稿的时候 警告
        case 1:
          return 'info' // 待审核
        case 2 :
          return '' // 已发表
        case 3:
          return 'danger' // 失败 错误
      }
    }
  },
  methods: {
    // 修改内容的方法 跳到发布页面
    toPublish () {
      // 编程式导航
      this.$router.push('/home/publish')
    },
    // 删除事件
    delMaterial (id) {
      // 先提示一下
      this.$confirm('您确定要删除吗?', '提示').then(() => {
        this.$axios({
          method: 'delete',
          url: `/articles/${id}` // 地址 是  /articles/:target target 是文章id
        }).then(() => {
          this.changeCondition()// 重新加载
          this.$message.success('操作成功')
        }).catch(() => {
          this.$message.error('操作失败')
        })
      })
    },
    // 改变页码事件 分页
    changePage (newPage) {
      this.page.currentPage = newPage// 最新页码赋值给变量
      this.changeCondition()// 直接调用改变事件的方法
    },
    // 改变了条件 搜索 先组合搜锁条件
    changeCondition () {
      // 当触发此方法时 表单的数据已经变成最新的了
      // 组装筛选条件 params 这里定义这个对象名为了传参数时简写
      const params = {
        page: this.page.currentPage, // 如果条件改变  就回到第一页
        per_page: this.page.pageSize,
        // 文章状态，0-草稿，1-待审核，2-审核通过，3-审核失败，4-已删除，不传为全部
        status: this.searchForm.status === 5 ? null : this.searchForm.status, // 假定为5就不传就是全部获取
        channel_id: this.searchForm.channel_id, // 就是表单数据
        begin_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length ? this.searchForm.dateRange[0] : null,
        end_pubdate: this.searchForm.dateRange && this.searchForm.dateRange.length > 1 ? this.searchForm.dateRange[1] : null
      }
      // 通过接口传入
      this.getArticles(params)// 直接获取的方法
    },
    // 获取频道数据
    async getChannels () {
      const result = await getChannels()
      // 获取频道接口返回的数据
      this.channels = result.data.channels
    },
    // 获取文章列表
    getArticles (params) {
      this.$axios({
        url: '/articles', // 请求地址
        params// es6写法
      }).then(result => {
        // console.log(result)
        this.list = result.data.results// 获取文章列表
        this.page.total = result.data.total_count// 将总数赋值给变量 写活 分页插件
      })
    }
  },
  created () {
    // 获取频道数据
    this.getChannels()
    this.getArticles()
  }
}
</script>

<style lang="less" scoped>
.articles{
    .total{
        height: 60px;
        border-bottom:1px solid #ccc ;
    }
    // 文章循环箱样式
    .article-item{
        display: flex;
        justify-content: space-between;//两头对齐
        padding: 20px 0;
        border-bottom: 1px solid #cccccc;
        .left{
            display: flex;
            img{
                width: 180px;
            height: 100px;
            border-radius: 4px;
            }
            .info{
                display: flex;
                flex-direction: column;//竖向
                height: 100px;
                justify-content: space-around;//竖直间距相等
                margin-left: 10px;
                .date{
                    color: #999;
                    font-size: 12px;
                }
                .tag{
                     width: 60px;
               text-align: center;
                }
            }
        }
        .right {
           span {
             font-size: 12px;
             margin-right: 8px;
             cursor: pointer;//鼠标敷上去
             user-select: none;//不让他选择
           }
         }
    }
}
</style>
