import request from '@/utils/request'

// 获取币种列表
export function coinList(data) {
  return request({
    url: 'admin/coin/list',
    method: 'get',
    data
  })
}

// 获取币种详情
export function coinInfo(data) {
    return request({
      url: 'admin/coin/coin-info',
      method: 'get',
      data
    })
}


// 启用禁止币种
export function coinEnableOrDisable(data) {
    return request({
      url: 'admin/coin/enableOrDisable',
      method: 'get',
      data
    })
}

// 创建/修改币种
export function coinModifyCoin(data,type) {
    return request({
      url: `admin/${type === 'add' ? 'coin' : 'coin/modifyCoin'}`,
      method: 'post',
      data,
      requestType:'JSON'
    })
}


