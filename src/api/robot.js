import request from '../utils/request';

// 分页查询
export function getAllRobots(params) {
  return request({
    url: '/robot/queryByPage',
    method: 'get',
    params: params
  })
}