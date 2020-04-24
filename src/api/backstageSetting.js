import request from '@/utils/request'

// 获取后台用户列表
export function getUserList(data) {
  return request({
    url: 'admin/user/userList',
    method: 'post',
    data
  })
}

// 获取角色列表
export function getUserRoleList(data) {
    return request({
      url: 'admin/user/roleList',
      method: 'post',
      data
    })
}

// 获取权限列表
export function getUserAuthList(data) {
    return request({
      url: 'admin/user/permissionList',
      method: 'post',
      data
    })
}

// 后台用户操作日志
export function getOperationLog(data) {
    return request({
      url: 'admin/user/operationLog',
      method: 'post',
      data
    })
}

// 导出后台用户操作日志
export function exportOperationLog(data) {
    return request({
      url: 'admin/user/exportOperationLog',
      method: 'post',
      data,
      exportsExcel:true,
      responseType: 'blob'
    })
}

// 删除后台用户操作日志
export function delOperationLog(data) {
  return request({
    url: 'admin/user/delOperationLog',
    method: 'post',
    data
  })
}

// 创建/修改角色
export function roleAddOrEdit(data,type) {
  return request({
    url: `admin/user/${type === 'add' ? 'addRole' : 'updateRole'}`,
    method: 'post',
    data,
  })
}

// 创建/修改权限
export function authAddOrEdit(data,type) {
  return request({
    url: `admin/user/${type === 'add' ? 'addPermissionList' : 'updatePermissionList'}`,
    method: 'post',
    data,
  })
}

// 创建/修改后台用户
export function userAddOrEdit(data,type) {
  return request({
    url: `admin/user/${type === 'add' ? 'addUser' : 'updateUsers'}`,
    method: 'post',
    data,
  })
}

// 后台用户详情
export function userDetails(data) {
  return request({
    url: 'admin/user/userDetails',
    method: 'post',
    data
  })
}

// 角色详情
export function roleDetails(data) {
  return request({
    url: 'admin/user/roleDetails',
    method: 'post',
    data
  })
}


// 删除后台用户(这里不做逻辑删除)
export function delUsers(data) {
  return request({
    url: 'admin/user/delUsers',
    method: 'post',
    data
  })
}

// 删除权限
export function delPermissionList(data) {
  return request({
    url: 'admin/user/delPermissionList',
    method: 'post',
    data
  })
}



// 删除角色
export function delRole(data) {
  return request({
    url: 'admin/user/delRole',
    method: 'post',
    data
  })
}

// 导出权限列表
export function exportPermissionList(data) {
  return request({
    url: 'admin/user/exportPermissionList',
    method: 'post',
    data,
    exportsExcel:true,
    responseType: 'blob'
  })
}


// 导出后台用户列表
export function exportUserList(data) {
  return request({
    url: 'admin/user/exportUserList',
    method: 'post',
    data,
    exportsExcel:true,
    responseType: 'blob'
  })
}

// 菜单列表
export function menuList(data) {
  return request({
    url: 'admin/user/menuList',
    method: 'post',
    data
  })
}
