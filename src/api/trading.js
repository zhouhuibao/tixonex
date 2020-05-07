import request from '@/utils/request'

// 币币交易参数设置
export function configUpdateSystem(data) {
  return request({
    url: 'admin/config/update-system',
    method: 'post',
    data,
    requestType:'JSON'
})
}

// 获取币币交易参数设置详情
export function configSystem(data) {
    return request({
      url: 'admin/config/system',
      method: 'get',
      data
    })
}

// 获取所有交易市场
export function marketList(data) {
    return request({
      url: 'admin/market',
      method: 'get',
      data
    })
}

// 获取交易市场详情
export function marketDetail(data) {
    return request({
      url: 'admin/market/detail',
      method: 'get',
      data
    })
}

// 禁用/开启交易市场
export function closeOpenMarket(data) {
    return request({
      url: 'admin/market/close_or_open_market',
      method: 'get',
      data
    })
}

// 创建/修改交易市场
export function marketAddUpdate(data,type) {
    return request({
      url: `admin/market/${type === 'add' ? 'add' : 'update'}`,
      method: 'post',
      data,
      requestType:'JSON'
    })
}

// 委托列表,查询所有
export function getTradeListAll(data) {
    return request({
      url: 'admin/trade/getTradeListAll',
      method: 'get',
      data
    })
}

// 取消某条订单
export function cancelTrade(data) {
    return request({
      url: 'admin/trade/cancel-trade',
      method: 'get',
      data
    })
}

// 某条订单的成交列表
export function tradeDeal(data) {
    return request({
      url: 'admin/trade/deal',
      method: 'get',
      data
    })
}

// 获取交易日志和返佣详情列表(交易手续费)
export function tradeRewardLs(data) {
  return request({
    url: 'admin/trade/trade-reward-ls',
    method: 'get',
    data
  })
}