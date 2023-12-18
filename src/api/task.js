import request from '../utils/request'

// 分页查询任务
export function getAllTasks(params) {
  return request({
    url: '/task/queryByPage',
    method: 'get',
    params: params
  })
}

// 查询任务详情
export function getOneTask(params) {
  return request({
    url: '/task/queryOne',
    method: 'get',
    params: params
  })
}

// 新增任务
export function addTask(data) {
  return request({
    url: '/task/add',
    method: 'post',
    data: data
  })
}

// 编辑任务
export function editTask(data) {
  return request({
    url: '/task/edit',
    method: 'post',
    data: data
  })
}

// 删除任务
export function delTask(data) {
  return request({
    url: '/task/delete',
    method: 'delete',
    data: data
  })
}