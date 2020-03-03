<template>
  <!--layout布局组件el-row和el-col  -->
  <el-row class="layout-header" type="flex" align="middle">
      <!-- 加：是因为span后边跟的是number 不加：是字符串 -->
      <el-col :span="12" class="left">
          <i class="el-icon-s-fold"></i>
          <span>抽象带篮子工作室</span>
      </el-col>
      <!-- 右侧 -->
      <el-col :span="12" class="right">
          <!-- 在放一个el-row 用他的的布局 因为默认是左对齐-->
          <!-- 头像 -->
          <el-row type="flex" justify="end" align="middle">
              <img :src="userInfo.photo" alt="">
            <!-- 下拉菜单 el-dropdown    点击下拉菜单选项触发command事件-->
        <el-dropdown trigger="click" @command="clickMenu">
            <!-- 显示的内容 -->
            <span>{{userInfo.name}}</span>
            <!-- 下拉内容使用具名插槽dropdown  el-dropdown-menu是专门做下拉的组件-->
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='info'>个人信息</el-dropdown-item>
                <el-dropdown-item command='git'>git地址</el-dropdown-item>
                <el-dropdown-item command='lgout'>退出</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
          </el-row>

      </el-col>
  </el-row>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {} // 定义一个空的个人信息
    }
  },
  methods: {
    clickMenu (command) {
    //   alert(1)
    // 组件内置方法
    // 三种情况
      if (command === 'info') {
        //   点击个人信息
      } else if (command === 'git') {
        //   点击git 地址就会跳转到git仓库
        window.location.href = 'https://github.com/zhoushibo123'
      } else {
        //   退出系统 删除本地token 返回登录页
        window.localStorage.removeItem('user-token')
        this.$router.push('/login')// 编程式导航
      }
    }
  },
  //   Vue实例化后立即触发钩子函数
  created () {
    const token = localStorage.getItem('user-token') // 从本地取出钥匙
    // 获取个人信息
    this.$axios({
      url: '/user/profile', // 获取个人信息接口
      headers: {
        Authorization: `Bearer ${token}` // 格式要求 Bearer +token
      }// 请求头参数 headers放置请求头参数
    }).then(result => {
      // 加载成功了将数据赋值给userInfo
      this.userInfo = result.data.data
    })
  }
}
</script>

<style lang='less' scoped>
.layout-header{
    height: 60px;
    .left{
        i{
            font-size: 20px;
        }
    }
    .right{
        img{
            height:40px;
            width: 40px;
            border-radius: 50%;
            margin-right: 4px;
        }
    }
}
</style>
