import request from '../utils/request';

// 分页查询
export function getAllPoints(params) {
  return request({
    url: '/point/queryByPage',
    method: 'get',
    params: params
  })
} 