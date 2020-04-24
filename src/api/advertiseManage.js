import request from '@/utils/request'

// 获取广告列表
export function getadvertiseList(data) {
  return request({
    url: 'admin/advertise',
    method: 'get',
    data
  })
}

// 禁用/启用文章
export function disableArticles(data,type) {
  console.log(type)
  return request({
    url: type === 'SHOW' ? 'admin/article/disable' : 'admin/article/enable',
    method: 'post',
    data
  })
}

// 删除广告
export function delAdvertiseBatch(data) {
  return request({
    url: 'admin/advertise/delAdvertiseBatch',
    method: 'post',
    data
  })
}

// 获取广告详情
export function detailAdvertise(data) {
  return request({
    url: 'admin/advertise/detail',
    method: 'get',
    data
  })
}

// 创建/修改广告
export function addAdvertise(data,type) {
  return request({
    url: `admin/advertise/${type === 'add' ? 'addAdvertise' : 'updateADInfo'}`,
    method: 'post',
    data,
    // headers:{
    //   'Content-Type':'application/json'
    // }
  })
}

