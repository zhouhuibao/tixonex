import Vue from 'vue'
import Router from 'vue-router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/user-modules/user-manage',
    hidden: true
  },
  {
    path: '/user-modules',
    component: Layout,
    name: '用户模块',
    meta: { title: '用户模块', icon: 'example' },
    children: [
      {
      path: 'user-manage',
      name: '用户管理',
      component: () => import('@/views/userModules/userManage/index'),
      meta: { title: '用户管理'}
    },
    {
      path: 'user-assets',
      name: '用户资产',
      component: () => import('@/views/userModules/userAssets'),
      meta: { title: '用户资产'}
    },
    {
      path: 'water-information',
      name: '全栈流水信息',
      component: () => import('@/views/userModules/waterInformation'),
      meta: { title: '全栈流水信息'}
    },
    {
      path: 'asset-statistics',
      name: '资产统计',
      component: () => import('@/views/userModules/assetStatistics'),
      meta: { title: '资产统计'}
    },
    {
      path: 'operation',
      component: () => import('@/views/userModules/userManage/userOperation'),
      meta: { title: '操作' },
      hidden:true
    }
  ]
  },
  {
    path: '/denomination',
    component: Layout,
    redirect: '/denomination/currency-set',
    name: '币种配置',
    meta: { title: '币种配置', icon: 'example' },
    children: [
      {
        path: 'currency-set',
        name: '币种设置',
        component: () => import('@/views/denomination/currencySet'),
        meta: { title: '币种设置', icon: 'table' }
      },
      {
        path: 'operation',
        component: () => import('@/views/denomination/coinOperation'),
        meta: { title: '操作' },
        hidden:true
      }
    ]
  },

  {
    path: '/trading',
    component: Layout,
    redirect: '/trading/trading-data-setting',
    name: '币币交易',
    meta: { title: '币币交易', icon: 'example' },
    children: [
      {
        path: 'trading-data-setting',
        name: '交易参数设置',
        component: () => import('@/views/trading/tradingDataSetting'),
        meta: { title: '交易参数设置',}
      },
      {
        path: 'trading-market-setting',
        name: '交易市场设置',
        component: () => import('@/views/trading/tradingMarketSetting/index'),
        meta: { title: '交易市场设置', },
      },
      {
        path: 'trading-list',
        name: '币币交易委托列表',
        component: () => import('@/views/trading/tradingList'),
        meta: { title: '币币交易委托列表', }
      },
      {
        path: 'trading-poundage',
        name: '币币交易手续费',
        component: () => import('@/views/trading/tradingPoundage'),
        meta: { title: '币币交易手续费', icon: 'table' }
      },
      {
        path: 'tMSOperation',
        component: () => import('@/views/trading/tradingMarketSetting/tMSOperation'),
        meta: { title: '操作' },
        name: '交易市场设置操作',
        hidden:true
      },
    ]
  },

  {
    path: '/theCoin-reward',
    component: Layout,
    redirect: '/theCoin-reward/theCoin-history',
    name: '拨币/奖励',
    meta: { title: '拨币/奖励', icon: 'example' },
    children: [
      {
        path: 'the-Coin',
        name: '拨币',
        component: () => import('@/views/theCoinReward/theCoin'),
        meta: { title: '拨币' }
      },
      {
        path: 'theCoin-history',
        name: '拨币记录',
        component: () => import('@/views/theCoinReward/theCoinHistory'),
        meta: { title: '拨币记录' }
      },
      {
        path: 'lockUp-config',
        name: '锁仓配置',
        component: () => import('@/views/theCoinReward/lockUpConfig/index'),
        meta: { title: '锁仓配置'}
      },
      {
        path: 'release-report',
        name: '释放报告',
        component: () => import('@/views/theCoinReward/releaseReport'),
        meta: { title: '释放报告'}
      },
      {
        path: 'user-lock-list',
        name: '用户锁定资产释放记录',
        component: () => import('@/views/theCoinReward/userLockList'),
        meta: { title: '用户锁定资产释放记录'}
      },
      {
        path: 'register-reward',
        name: '注册奖励',
        component: () => import('@/views/theCoinReward/registerReward'),
        meta: { title: '注册奖励'}
      },
      {
        path: 'recommendedreward',
        name: '推荐奖励',
        component: () => import('@/views/theCoinReward/recommendedReward'),
        meta: { title: '推荐奖励'}
      },
      {
        path: 'lockOperation',
        component: () => import('@/views/theCoinReward/lockUpConfig/lockOperation'),
        meta: { title: '操作' },
        name: '锁仓配置操作',
        hidden:true
      },
    ]
  },

  {
    path: '/rollInOrOut',
    component: Layout,
    redirect: '/rollInOrOut/rollInOrOut-list',
    name: '转入/转出',
    meta: { title: '转入/转出', icon: 'example' },
    children: [
      {
        path: 'rollInOrOut-list',
        name: '转入/转出记录',
        component: () => import('@/views/rollInOrOut/rollInOrOutList'),
        meta: { title: '转入/转出记录' }
      },
      {
        path: 'rollOut-audit',
        name: '转出审核',
        component: () => import('@/views/rollInOrOut/rollOutAudit'),
        meta: { title: '转出审核'}
      },
      {
        path: 'two-rollOut-audit',
        name: '二次转出审核',
        component: () => import('@/views/rollInOrOut/twoRollOutAudit'),
        meta: { title: '二次转出审核'}
      },
    ]
  },
  {
    path: '/OTC-manage',
    component: Layout,
    redirect: '/OTC-manage/OTC-order-list',
    name: 'OTC管理',
    meta: { title: 'OTC管理', icon: 'example' },
    children: [
      {
        path: 'OTC-order-list',
        name: 'OTC挂单列表',
        component: () => import('@/views/OtcManage/otcOrderList'),
        meta: { title: 'OTC挂单列表' }
      },
      {
        path: 'OTC-config-list',
        name: 'OTC配置列表',
        component: () => import('@/views/OtcManage/otcConfigList/index'),
        meta: { title: 'OTC配置列表'}
      },
      {
        path: 'OTC-JY-Order-list',
        name: 'OTC交易订单列表',
        component: () => import('@/views/OtcManage/otcJYOrderList'),
        meta: { title: 'OTC交易订单列表'}
      },
      {
        path: 'OTC-auth-list',
        name: 'OTC卖单权限列表',
        component: () => import('@/views/OtcManage/otcAuthList'),
        meta: { title: 'OTC卖单权限列表'}
      },
      {
        path: 'OTC-config-operation',
        component: () => import('@/views/OtcManage/otcConfigList/OTCConfigOperation'),
        meta: { title: '操作' },
        name: 'OTC配置操作',
        hidden:true
      },
    ]
  },

  {
    path: '/user-message',
    component: Layout,
    children: [
      {
        path: 'userMessageList',
        name: '用户留言',
        component: () => import('@/views/userMessage/userMessageList'),
        meta: { title: '用户留言', icon: 'form' }
      }
    ]
  },
  {
    path: '/article-manage',
    component: Layout,
    children: [
      {
        path: 'article-manage-list',
        name: '文章管理',
        component: () => import('@/views/articleManage'),
        meta: { title: '文章管理', icon: 'form' }
      },
      {
        path: 'article-manage-addOrEditArticle',
        component: () => import('@/views/articleManage/addOrEditArticle'),
        meta: { title: '操作' },
        hidden:true
      }
    ]
  },
  {
    path: '/advertising-mange',
    component: Layout,
    children: [
      {
        path: 'advertising-mange-list',
        name: '广告管理',
        component: () => import('@/views/advertisingMange'),
        meta: { title: '广告管理', icon: 'form' }
      },
      {
        path: 'operation',
        component: () => import('@/views/advertisingMange/operation'),
        meta: { title: '操作' },
        hidden:true
      }
    ]
  },

  {
    path: '/backstage-setting',
    component: Layout,
    redirect: '/backstage-setting/backstage-user',
    name: '后台设置',
    meta: { title: '后台设置', icon: 'example' },
    children: [
      {
        path: 'backstage-user',
        name: '后台用户',
        component: () => import('@/views/backstageSetting/backstageUser/index'),
        meta: { title: '后台用户' }
      },
      {
        path: 'role',
        name: '角色',
        component: () => import('@/views/backstageSetting/role/index'),
        meta: { title: '角色' }
      },
      {
        path: 'auth-list',
        name: '权限列表',
        component: () => import('@/views/backstageSetting/authList/index'),
        meta: { title: '权限列表'}
      },
      {
        path: 'menu-mange',
        name: '菜单管理',
        component: () => import('@/views/backstageSetting/menuMange'),
        meta: { title: '菜单管理' }
      },
      {
        path: 'operation-log',
        name: '后台操作日志',
        component: () => import('@/views/backstageSetting/operationLog'),
        meta: { title: '后台操作日志'}
      },
      {
        path: 'backstage-user-operation',
        component: () => import('@/views/backstageSetting/backstageUser/backstageUserOperation'),
        meta: { title: '操作' },
        hidden:true
      },
      {
        path: 'auth-operation',
        component: () => import('@/views/backstageSetting/authList/authOperation'),
        meta: { title: '操作' },
        hidden:true
      },
      {
        path: 'role-operation',
        component: () => import('@/views/backstageSetting/role/roleOperation'),
        meta: { title: '操作' },
        hidden:true
      }

      
    ]
  },
  {
    path: '/userSettings',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/userSettings/index'),
        meta: { title: '用户设置'},
        hidden:true
      }
    ]
  },
  

  // {
  //   path: '/example',
  //   component: Layout,
  //   redirect: '/example/table',
  //   name: 'Example',
  //   meta: { title: 'Example', icon: 'example' },
  //   children: [
  //     {
  //       path: 'table',
  //       name: 'Table',
  //       component: () => import('@/views/table/index'),
  //       meta: { title: 'Table', icon: 'table' }
  //     },
  //     {
  //       path: 'tree',
  //       name: 'Tree',
  //       component: () => import('@/views/tree/index'),
  //       meta: { title: 'Tree', icon: 'tree' }
  //     }
  //   ]
  // },

  // {
  //   path: '/form',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: 'Form', icon: 'form' }
  //     }
  //   ]
  // },

  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   meta: {
  //     title: 'Nested',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'Menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'Menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'Menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'Menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'Menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'Menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },

  // {
  //   path: 'external-link',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
  //       meta: { title: 'External Link', icon: 'link' }
  //     }
  //   ]
  // },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
