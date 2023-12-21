import request from '../utils/request';

// 分页查询
export function getAllHouses(params) {
  return request({
    url: '/warehouse/queryByPage',
    method: 'get',
    params: params
  })
}

// 查询仓库详情
export function getOneHouse(params) {
  return request({
    url: '/warehouse/queryOne',
    method: 'get',
    params: params
  })
}

// 新增仓库
export function addHouse(data) {
  return request({
    url: '/warehouse/add',
    method: 'post',
    data: data
  })
}

// 编辑仓库
export function editHouse(data) {
  return request({
    url: '/warehouse/edit',
    method: 'post',
    data: data
  })
}

// 删除仓库
export function delHouse(data) {
  return request({
    url: '/warehouse/delete',
    method: 'delete',
    data: data
  })
}