<template>
 <div style="position:relative">
     <!-- 头像 -->
     <div class="demo-type">
      <el-avatar class="zh" src="https://wx3.sinaimg.cn/mw690/006NcDUhly1gcdiklv0tbj30n00tfdgk.jpg"></el-avatar>
     </div>
      <div class="login">
      <!-- <span>我是登陆界面</span> -->
      <!-- 表单内容 -->
      <!-- logo -->
      <el-card class="login-card">
          <div class="title">
              <img src="../../assets/img/cxdlz.png" alt="">
          </div>
          <!-- 表单  给el-form一个ref属性-->
          <el-form :model='loginForm' :rules="loginRules" ref="loginForm" style="margin-top:20px">
              <!-- 表单容器 绑定model属性  绑定rules属性（表单验证规则） -->
              <el-form-item prop="mobile">
              <!--表单域  -->
              <el-input v-model="loginForm.mobile" placeholder="请输入手机号">
              </el-input>
              </el-form-item>
               <!-- 验证码 绑定model属性  绑定rules属性（表单验证规则） -->
            <el-form-item prop="code">
                <el-input  v-model="loginForm.code" style="width:60%" placeholder="请输入验证码"></el-input>
                 <!-- 放置一个按钮 -->
                <el-button style="float:right" plain>发送验证码</el-button>
            </el-form-item>
            <!-- 表单域    绑定model属性  绑定rules属性（表单验证规则）-->
            <el-form-item prop="checked">
           <!-- 是否同意被人家坑 -->
           <el-checkbox  v-model="loginForm.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
           </el-form-item>
           <!-- 按钮 -->
         <el-form-item>
           <el-button @click="login" style="width:100%" type="primary">登录</el-button>
         </el-form-item>
          </el-form>
      </el-card>
  </div>
 </div>
</template>

<script>
export default {
  data () {
    return {
      // 登陆表单的数据
      loginForm: {
        mobile: '', // 手机号
        code: '', // 验证码
        checked: false // 是否同意用户协议
      },
      //   定义表单的验证规则必写 三个字段
      loginRules: {
        //   required ：true表示该字段必填
        mobile: [{ required: true, message: '您的手机号不能为空' }, {
          pattern: /^1[3-9]\d{9}$/, message: '您的手机号格式不正确' // 正则表达式
        }], // 手机号
        code: [{ required: true, message: '您的验证码不能为空' }, {
          pattern: /^\d{6}$/, message: '验证码应该是6位数字'// 6位验证码
        }], // 验证码
        // checked进行自定义校验 因为required不能校验true和false
        // callback是一个回调函数 不论成功与否都会执行
        // 成功执行callback  失败执行 callback（new Error（‘错误信息’））
        // 根据value的布尔值判断 效验是否成功 true为成功 false为失败
        checked: [{
          validator: function (rule, value, callback) {
            value ? callback() : callback(new Error('您必须同意勾选我们的条款'))
          }
        }]// 是否同意用户协议
      }
    }
  },
  methods: {
    // 定义点击事件
    login () {
      // this.$refs.loginForm获取的就是el-form的对象实例
    // 第一种 回调函数 isOK，fields（没有效验通过的字段）
    //   this.$refs.loginForm.validate(function(isOK){
      // if(isOK){console.log('通过')}else{console.log('没通过')}
    // })
    // 第二种 promise形式
      this.$refs.loginForm.validate().then(() => {
        //   通过校验后调接口调登录接口 看看手机号是否正确
        // console.log('登陆成功')
        this.$axios({
          url: '/authorizations',
          //   data: { ...this.loginForm, checked: null },
          data: this.loginForm, // body请求体参数
          method: 'post'

        }).then(result => {
        //   console.log(result.data.data.token)
        // 将token存放在本地 token是钥匙 每次发ajax都要携带钥匙
          window.localStorage.setItem('user-token', result.data.data.token)
          // 跳转到主页编程是导航
          this.$router.push('/home') // push和router-link类似 to属性可以直接是字符串也可以是对象
        }).catch(() => {
          // 提示信息
        //   第一种用法
        //   this.$message({ message: '用户名或验证码错误', type: 'error' })
        // 第二种
          this.$message.error('手机号或者验证码错误')
        })
      })
    }
  }
}
</script>

<style lang='less' scoped>
// 如果需要写less  在style上lang="less" scoped只对自己的样式起作用
.login{
    background-image: url('../../assets/img/bj.jpg');
    height: 100vh;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-card{
        width: 440px;
       height: 380px;
    background:transparent;
    box-shadow:2px 4px 6px 2px rgba(0,0,0,0.1);
        .title{
            text-align: center;
            img{
                height: 100px;
            }
        }
    }
}
.demo-type{
position: absolute;
margin: 10px 0;
.zh{
background-size:cover;
}
}
</style>
