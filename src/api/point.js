import request from '../utils/request';

// 分页查询
export function getAllPoints(params) {
  return request({
    url: '/point/queryByPage',
    method: 'get',
    params: params
  })
}

// 查询详情
export function getOnePoint(params) {
  return request({
    url: '/point/queryOne',
    method: 'get',
    params: params
  })
}

// 新增
export function addPoint(data) {
  return request({
    url: '/point/add',
    method: 'post',
    data: data
  })
}

// 编辑
export function editPoint(data) {
  return request({
    url: '/point/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function delPoint(data) {
  return request({
    url: '/point/delete',
    method: 'delete',
    data: data
  })
}