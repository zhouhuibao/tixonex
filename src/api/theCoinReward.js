import request from '@/utils/request'

// 推荐奖励
export function rewardReferral(data) {
  return request({
    url: 'admin/reward/referral',
    method: 'get',
    data
  })
}

// 注册奖励
export function rewardRegister(data) {
    return request({
      url: 'admin/reward/register',
      method: 'get',
      data
    })
  }

// 用户资产锁仓记录列表
export function lockCoin(data) {
    return request({
      url: 'admin/lock-coin/lock-history',
      method: 'get',
      data
    })
}

// 释放报告
export function dispatchLog(data) {
    return request({
      url: 'admin/dispatch/dispatch-log',
      method: 'get',
      data
    })
}

// 删除锁仓配置
export function delDispatchConfig(data) {
    return request({
      url: 'admin/dispatch/del-dispatch-config',
      method: 'post',
      data
    })
}


// 创建/修改锁仓配置
export function addOrEditDispatchConfig(data,type) {
    return request({
      url: `admin/dispatch/${type === 'add' ? 'admin-add-dispatch-config' : 'update-dispatch-config'}`,
      method: 'post',
      data,
      requestType:'JSON'
    })
}


// 获取定时任务配置信息
export function getCronConfig(data) {
    return request({
      url: 'admin/dispatch/get-cron-config',
      method: 'post',
      data
    })
}


// 通过id获取锁仓配置的详情
export function getDispatchByID(data) {
    return request({
      url: 'admin/dispatch/get-dispatch-info-by-id',
      method: 'get',
      data
    })
}

// 锁仓配置
export function getDispatchConfig(data) {
    return request({
      url: 'admin/dispatch/get-dispatch-config',
      method: 'get',
      data
    })
}

// 拨币
export function bbDispatch(data) {
    return request({
      url: 'admin/dispatch/dispatch',
      method: 'post',
      data,
      // requestType:'JSON'
    })
}

// 拨币记录
export function getDispatch(data) {
    return request({
      url: 'admin/dispatch/get-dispatch',
      method: 'get',
      data
    })
}