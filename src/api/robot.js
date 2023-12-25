import request from '../utils/request';

// 分页查询
export function getAllRobots(params) {
  return request({
    url: '/robot/queryByPage',
    method: 'get',
    params: params
  })
}

// 查询详情
export function getOneRobot(params) {
  return request({
    url: '/robot/queryOne',
    method: 'get',
    params: params
  })
}

// 新增
export function addRobot(data) {
  return request({
    url: '/robot/add',
    method: 'post',
    data: data
  })
}

// 编辑
export function editRobot(data) {
  return request({
    url: '/robot/edit',
    method: 'post',
    data: data
  })
}

// 删除
export function delRobot(data) {
  return request({
    url: '/robot/delete',
    method: 'delete',
    data: data
  })
}