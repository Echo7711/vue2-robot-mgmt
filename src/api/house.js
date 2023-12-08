import request from '../utils/request';

// 分页查询
export function getAllHouses(params) {
  return request({
    url: '/warehouse/queryByPage',
    method: 'get',
    params: params
  })
}