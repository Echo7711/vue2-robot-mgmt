import request from '../utils/request';

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

// 分页查询用户
export function getAllUsers(params) {
  return request({
    url: '/user/queryByPage',
    method: 'get',
    params: params
  })
}

// 查询账号详情
export function getOneUser(params) {
  return request({
    url: '/user/queryOne',
    method: 'get',
    params: params
  })
}

// 新增账号
export function addUser(data) {
  return request({
    url: '/user/add',
    method: 'post',
    data: data
  })
}

// 修改账号
export function editUser(data) {
  return request({
    url: '/user/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function delUser(data) {
  return request({
    url: '/user/delete',
    method: 'delete',
    data: data
  })
}