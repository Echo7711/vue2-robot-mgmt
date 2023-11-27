import request from '../utils/request'

// 分页查询任务
export function getAllTasks(params) {
  return request({
    url: '/task/queryByPage',
    method: 'get',
    params: params
  })
}