// 封装请求工具
// 对于axios的二次封装
// 配置拦截器
import axios from 'axios'
import router from '@/router'// 路由实例对象
import JSONBig from 'json-bigint'// 引入处理大数字的第三方包
// 对拦截器的其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置共公的请求地址
axios.defaults.transformResponse = [function (data) {
  /* 对axios的返回数据进行自定义处理 用json-bigint代替原来的json
   transformResponse中要返回处理的结果
   transformResponse是所有请求字符串 转化成 对象的入口 在这个位置 如果处理了相当于多有的接口都处理了大数字
  */
  // 在这里主要处理id超过大数字的时候 转化 不正确的问题 JSONbing.parse是第三方的包
  // 只要知道他可以帮我们结果转化问题
  // const result=JSON.parse（data）
  // return result
  // 用json-bigint来转化代替默认
  // 在这里需要判断下一下data是不是空如果是空就不能转化了
  return data ? JSONBig.parse(data) : {}
}]
// 请求拦截器的开发
axios.interceptors.request.use(function (config) {
// 成功时执行第一个参数   会有一个config就是所有的axios的请求信息
// 在第一个函数中 需要将配置进行返回  返回的配置 会作为请求参数进行请求
// 在返回之前 就是统一注入token的最佳时间
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 格式要求 Bearer +token
  return config
}, function (error) {
// 失败时执行第二个 axios是支持promise  如果失败直接reject reject会直接进入axios的catch中
  return Promise.reject(error)
})
// ------------------------------
// 响应拦截器的开发
axios.interceptors.response.use(function (response) {
  // 第一种成功情况下
// 回调的第一个参数是响应体
// 在拦截器中 需要将数据返回
  return response.data ? response.data : {} // 有的接口没有任何响应数据 做下判断 有数据的返回
}, function (error) {
// 第二种 失败的情况执行
// error是错误对象  里面包含了错误状态吗和响应信息
// 401状态码   标识用户身份认证失败  表示拿错钥匙或钥匙没拿或格式不对
// 之前的导航守卫 效验了token有没有
// 应该换一个新钥匙
// 这里考虑会登录页重新登陆拿钥匙
// 会登录页之前应该吧旧钥匙给清除
  if (error.response.status === 401) {
    window.localStorage.removeItem('user-token')// 删除钥匙
    // 跳到登录页
    router.push('/login')
  }
  //   进行错误处理
  return Promise.reject(error)
})
export default axios
