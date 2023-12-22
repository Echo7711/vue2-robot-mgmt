import request from "../utils/request"

// 分页查询消息
export function getAllMsgs(params) {
  return request({
    url: '/msg/queryByPage',
    method: 'get',
    params: params
  })
}

// 消息通知确认
export function confirmMsg(data) {
  return request({
    url: '/msg/confirm',
    method: 'post',
    data: data
  })
}