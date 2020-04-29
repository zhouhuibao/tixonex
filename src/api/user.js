import request from '@/utils/request'
import { getToken, setToken, removeToken } from '@/utils/auth'

// 登录
export function login(data) {
  return request({
    url: 'admin/user/login',
    method: 'post',
    data
  })
}

// 判断用户的token是否有效
export function getInfo(data) {
  return request({
    url: 'admin/user/check-token',
    method: 'get',
    data
  })
}

// 退出
export function logout(data) {
  return request({
    url: 'admin/user/logout',
    method: 'get',
    data
  })
}

// 用户列表
export function userList(data) {
  return request({
    url: 'admin/user',
    method: 'get',
    data
  })
}

//启用,禁用用户
export function userIsAble(data,type) {
  return request({
    url: `admin/user/${type === 0 ? 'disable' :'enable'}`,
    method: 'post',
    data
  })
}

// 导出用户列表
export function exportUserList(data) {
  return request({
    url: 'admin/user/export',
    method: 'get',
    data,
    exportsExcel:true,
    responseType: 'blob'
  })
}

// 重置交易密码 //重置登录密码
export function resetPayPassword(data,type) {
  return request({
    url: `admin/user/${type === 'pay' ? 'pay-password' :'password'}`,
    method: 'post',
    data,
  })
}

// 用户审核
export function idCardPass(data) {
  return request({
    url: `admin/user/id-card-pass`,
    method: 'post',
    data,
  })
}

// 修改一个或者多个玩家分组
export function updateGroupType(data) {
  return request({
    url: `admin/user/update-group-type`,
    method: 'get',
    data,
  })
}

// 用户资产列表
export function financeList(data) {
  return request({
    url: `admin/finance/user-coin-info`,
    method: 'get',
    data,
  })
}

// 导出用户资产
export function exportFinanceList(data) {
  return request({
    url: 'admin/finance/user-coin-info-export',
    method: 'get',
    data,
    exportsExcel:true,
    responseType: 'blob'
  })
}

// 全栈流水信息列表
export function financeBillList(data) {
  return request({
    url: `admin/finance/bill-list`,
    method: 'get',
    data,
  })
}

// 资产统计列表
export function balanceStatList(data) {
  return request({
    url: `admin/balance-stat/list`,
    method: 'get',
    data,
  })
}

// 用户设置
export function userSetting(data) {
  return request({
    url: `admin/user/setting`,
    method: 'post',
    data,
  })
}

// 用户详情
export function userSettingDetails(data) {
  return request({
    url: `admin/user/settingDetails`,
    method: 'post',
    data,
  })
}

// 根据用户ID查询用户对应菜单列表--用户权限菜单
export function userPermissionMenuList(data) {
  return request({
    url: `admin/user/userPermissionMenuList`,
    method: 'post',
    data,
  })
}

// 获取国家区号
export function nationalCode(data) {
  return request({
    url: `admin/user/national-code`,
    method: 'post',
    data,
  })
}

// 获取用户详情
export function userDetail(data) {
  return request({
    url: `admin/user/detail`,
    method: 'get',
    data,
  })
}


// 修改用户信息
export function updateUser(data) {
  return request({
    url: `admin/user/updateUserInformation`,
    method: 'post',
    data,
    // requestType:'JSON'
  })
}
