import request from '@/utils/request'

// OTC挂单列表
export function otcApplications(data) {
  return request({
    url: 'admin/otc/applications',
    method: 'get',
    data
  })
}

// OTC配置列表
export function otcConfigList(data) {
    return request({
      url: 'admin/otc/config-list',
      method: 'get',
      data
    })
}

// otc获取配置详情
export function otcConfigDetail(data) {
    return request({
      url: 'admin/otc/config-detail',
      method: 'get',
      data
    })
}

// 删除配置
export function otcDelConfig(data) {
    return request({
      url: 'admin/otc/del-config',
      method: 'get',
      data
    })
}

// 新增/修改OTC配置
export function coinModifyCoin(data,type) {
    return request({
      url: `admin/otc/${type === 'add' ? 'add-config' : 'config'}`,
      method: 'post',
      data,
      requestType:'JSON'
    })
}

// 撤销下单
export function applicationCancel(data) {
    return request({
      url: 'admin/otc/application-cancel',
      method: 'post',
      data
    })
}

// OTC订单列表
export function otcOrders(data) {
    return request({
      url: 'admin/otc/orders',
      method: 'get',
      data
    })
}

// 获取订单详细信息
export function otcOrdersDetail(data) {
    return request({
      url: 'admin/otc/order-detail',
      method: 'get',
      data
    })
}

// 取消/完成订单
export function otcOrdersCacelDeal(data,type) {
    return request({
      url: `admin/otc${type === 'cancel' ? '/order-cancel' : '/order-deal'}`,
      method: 'post',
      data
    })
}

// 导出挂单
export function otcApplicationsDownload(data) {
    return request({
      url: 'admin/otc/applications-download',
      method: 'get',
      data
    })
}

// 导出订单
export function otcOrdersDownload(data) {
    return request({
      url: 'admin/otc/orders-download',
      method: 'get',
      data
    })
}

// OTC卖单权限列表
export function otcPrivileges(data) {
    return request({
      url: 'admin/otc/otc-privileges',
      method: 'get',
      data
    })
}

// OTC审批权限
export function approvePrivilege(data) {
    return request({
      url: 'admin/otc/approve-privilege',
      method: 'get',
      data
    })
}








