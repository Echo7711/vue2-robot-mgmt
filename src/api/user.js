import request from '../utils/request'

// 用户登录
export function login(params) {
  return request({
    url: '/user/login',
    method: 'post',
    data: params
  })
}

// 用户登出
export function logout(params) {
  return request({
    url: '/user/logout',
    method: 'post',
    data: params
  })
}