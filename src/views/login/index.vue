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
          <!-- 表单 -->
          <el-form :model='loginForm' :rules="loginRules"  style="margin-top:20px">
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
           <el-button style="width:100%" type="primary">登录</el-button>
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
      //   定义表单的验证规则必写
      loginRules: {

      }
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
