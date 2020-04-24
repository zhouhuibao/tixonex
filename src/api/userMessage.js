import request from '@/utils/request'

// 留言和反馈列表
export function feedbackList(data) {
  return request({
    url: 'admin/feedback/list',
    method: 'get',
    data
  })
}

// 获取留言/反馈详情
export function feedbackDetail(data) {
    return request({
      url: 'admin/feedback/detail',
      method: 'get',
      data
    })
}

// 删除留言
export function feedbackDetlete(data) {
    return request({
      url: 'admin/feedback/delete',
      method: 'post',
      data
    })
}