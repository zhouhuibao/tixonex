import request from '@/utils/request'

// 转入转出记录
export function transferHistory(data) {
  return request({
    url: 'admin/finance/transfer-history',
    method: 'get',
    data
  })
}

// 二次转出审核列表
export function transferSecondList(data) {
    return request({
      url: 'admin/finance/transfer-second-list',
      method: 'get',
      data
    })
}

// 转出审核列表
export function transferList(data) {
    return request({
      url: 'admin/finance/transfer-list',
      method: 'get',
      data
    })
}

// 一次审核失败/通过
export function oneTransferCheck(data,type) {
    return request({
      url: `admin/finance/${type === 'fail' ? 'transfer-check-fail' : 'transfer-check-pass'} `,
      method: 'get',
      data
    })
}

// 二次审核失败/通过
export function twoTransferCheck(data,type) {
    return request({
      url: `admin/finance/${type === 'fail' ? 'transfer-sencond-check-fail' : 'transfer-sencond-check-pass'} `,
      method: 'get',
      data
    })
}
