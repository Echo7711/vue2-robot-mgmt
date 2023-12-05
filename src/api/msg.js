import request from "../utils/request"

// 分页查询消息
export function getAllMsgs(params) {
  return request({
    url: '/msg/queryByPage',
    method: 'get',
    params: params
  })
}