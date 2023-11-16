import axios from "axios"

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
request.interceptors.request.use((config) => {
  return config
}, (error) => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use((res) => {
  // 2xx范围内状态码
  return res.data
}, (error) => {
  // 超出2xx范围状态码
  return Promise.reject(error)
})

export default request
