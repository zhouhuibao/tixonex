const path = "http://mgradmin.tixonex.com/" // 生产
// const path = "http://47.98.193.148/" // 测试服务器
// const path = "http://192.168.0.109:8089/" // 刘辉本地
// const path = "http://192.168.0.118:8089" // 龙群

module.exports = {
  ip:path,
  title: 'TixonEx',

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: false
}
