import axios from "axios"
import router from '../router/index'
import { message } from 'ant-design-vue'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

// request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 2xx范围内状态码
  const code = res.data.code || 200 //若未设置默认成功状态
  switch (code) {
    case 200: // 成功返回
      return res.data
    case 500: // token失效
      router.push({ path: '/login' })
      message.error(res.data.msg)
      return res.data
    default:
      return res.data
  }
}, (error) => {
  // 超出2xx范围状态码
  return Promise.reject(error)
})

export default request
