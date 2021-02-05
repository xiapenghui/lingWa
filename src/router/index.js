import Vue from 'vue'
import Router from 'vue-router'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [{
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect/index')
  }]
},
{
  path: '/login',
  component: () => import('@/views/login/index'),
  hidden: true
},
{
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
},
{
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
},
{
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
},
{
  path: '/',
  component: Layout,
  redirect: '/dashboard',
  children: [{
    path: 'dashboard',
    component: () => import('@/views/dashboard/index'),
    name: 'Dashboard',
    meta: {
      title: 'dashboard',
      icon: 'dashboard',
      affix: true
    }
  }]
}

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 系统管理
export const asyncRoutes = [
  //   {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/dashboard',
  //   children: [{
  //     path: 'dashboard',
  //     component: () => import('@/views/dashboard/index'),
  //     name: 'Dashboard',
  //     meta: {
  //       title: 'dashboard',
  //       icon: 'dashboard',
  //       affix: true
  //     }
  //   }]
  // },
  // 基础数据
  {
    path: '/BasicData',
    component: Layout,
    redirect: '/BasicData/OrganizationalManagement',
    name: 'BasicData',
    meta: {
      title: 'BasicData',
      icon: 'nested'

    },
    // 物料信息管理模块
    children: [
      // 组织架构管理
      {
        path: 'OrganizationalManagement',
        component: () => import('@/views/BasicData/OrganizationalManagement/index'), // Parent router-view
        name: 'OrganizationalManagement',
        meta: {
          title: 'OrganizationalManagement'

        },
        redirect: '/BasicData/OrganizationalManagement/CompanyMaintenance',
        children: [{
          path: 'CompanyMaintenance',
          component: () => import('@/views/BasicData/OrganizationalManagement/CompanyMaintenance'),
          name: 'CompanyMaintenance',
          meta: {
            title: 'CompanyMaintenance'

          }
        },
        {
          path: 'DepartmentMaintenance',
          component: () => import('@/views/BasicData/OrganizationalManagement/DepartmentMaintenance'),
          name: 'DepartmentMaintenance',
          meta: {
            title: 'DepartmentMaintenance'

          }
        },
        {
          path: 'Personnelinfor',
          component: () => import('@/views/BasicData/OrganizationalManagement/Personnelinfor'),
          name: 'Personnelinfor',
          meta: {
            title: 'Personnelinfor'
          }
        }
        ]
      },

      // 生产信息管理
      {
        path: 'ProductionManagement',
        component: () => import('@/views/BasicData/ProductionManagement/index'), // Parent router-view
        name: 'ProductionManagement',
        meta: {
          title: 'ProductionManagement'
        },
        redirect: '/BasicData/ProductionManagement/WorkInfo',
        children: [

          {
            path: 'WorkInfo',
            component: () => import('@/views/BasicData/ProductionManagement/WorkInfo'),
            name: 'WorkInfo',
            meta: {
              title: 'WorkInfo'
            }
          },

          {
            path: 'LineInfo',
            component: () => import('@/views/BasicData/ProductionManagement/LineInfo'),
            name: 'LineInfo',
            meta: {
              title: 'LineInfo'
            }
          },

          {
            path: 'CenterInfo',
            component: () => import('@/views/BasicData/ProductionManagement/CenterInfo'),
            name: 'CenterInfo',
            meta: {
              title: 'CenterInfo'
            }
          },

          {
            path: 'TerminalInfo',
            component: () => import('@/views/BasicData/ProductionManagement/TerminalInfo'),
            name: 'TerminalInfo',
            meta: {
              title: 'TerminalInfo'
            }
          }

        ]
      },

      // 产品信息管理
      {
        path: 'ProductMmanagement',
        component: () => import('@/views/BasicData/ProductMmanagement/index'), // Parent router-view
        name: 'ProductMmanagement',
        meta: {
          title: 'ProductMmanagement'
        },
        redirect: '/BasicData/ProductMmanagement/ProcessMaintenance',
        children: [{
          path: 'ProcessMaintenance',
          component: () => import('@/views/BasicData/ProductMmanagement/ProcessMaintenance'),
          name: 'ProcessMaintenance',
          meta: {
            title: 'ProcessMaintenance'
          }
        },

        {
          path: 'BomMangement',
          component: () => import('@/views/BasicData/ProductMmanagement/BomMangement'),
          name: 'BomMangement',
          meta: {
            title: 'BomMangement'

          }
        },
        {
          path: 'BomMangementDetaile',
          component: () => import('@/views/BasicData/ProductMmanagement/BomMangementDetaile'),
          name: 'BomMangementDetaile',
          hidden: true,
          meta: {
            title: 'BomMangementDetaile'
          }
        },

        {
          path: 'RouteMaintenance',
          component: () => import('@/views/BasicData/ProductMmanagement/RouteMaintenance'),
          name: 'RouteMaintenance',
          meta: {
            title: 'RouteMaintenance'
          }
        },
        {
          path: 'RouteMaintenanceDetaile',
          component: () => import('@/views/BasicData/ProductMmanagement/RouteMaintenanceDetaile'),
          name: 'RouteMaintenanceDetaile',
          hidden: true,
          meta: {
            title: 'RouteMaintenanceDetaile'
          }
        }

        ]
      },
      // 物料信息管理模块
      {
        path: 'MaterialManagement',
        component: () => import('@/views/BasicData/MaterialManagement/index'), // Parent router-view
        name: 'MaterialManagement',
        meta: {
          title: 'MaterialManagement'

        },
        redirect: '/BasicData/MaterialManagement/MaterialType',
        children: [
          {
            path: 'MaterialType',
            component: () => import('@/views/BasicData/MaterialManagement/MaterialType'),
            name: 'MaterialType',
            meta: {
              title: 'MaterialType'

            }
          },

          {
            path: 'MaterialInformation',
            component: () => import('@/views/BasicData/MaterialManagement/MaterialInformation'),
            name: 'MaterialInformation',
            meta: {
              title: 'MaterialInformation'

            }
          },
          {
            path: 'ProductMaintenance',
            component: () => import('@/views/BasicData/MaterialManagement/ProductMaintenance'),
            name: 'ProductMaintenance',
            meta: {
              title: 'ProductMaintenance'
            }
          }
        ]
      },

      // 其他主数据管理
      {
        path: 'OtherData',
        component: () => import('@/views/BasicData/OtherData/index'), // Parent router-view
        name: 'OtherData',
        meta: {
          title: 'OtherData'
        },
        // 客户信息管理
        redirect: '/BasicData/OtherData/CustomerInformation',
        children: [{
          path: 'CustomerInformation',
          component: () => import('@/views/BasicData/OtherData/CustomerInformation'),
          name: 'CustomerInformation',
          meta: {
            title: 'CustomerInformation'
          }
        }]
      }

    ]
  },

  // 仓储物流
  {
    path: '/WareHouse',
    component: Layout,
    redirect: '/WareHouse/BasicData',
    name: 'WareHouse',
    meta: {
      title: 'WareHouse',
      icon: 'tab'
    },
    children: [{
      path: 'BasicData',
      component: () => import('@/views/WareHouse/BasicData/index'),
      name: 'BasicData',
      meta: {
        title: 'BasicData'
      },
      redirect: '/WareHouse/BasicData/WarehouseInfor',
      children: [{
        path: 'WarehouseInfor',
        component: () => import('@/views/WareHouse/BasicData/WarehouseInfor'),
        name: 'WarehouseInfor',
        meta: {
          title: 'WarehouseInfor'
        }
      },
      {
        path: 'ReservoirInfor',
        component: () => import('@/views/WareHouse/BasicData/ReservoirInfor'),
        name: 'ReservoirInfor',
        meta: {
          title: 'ReservoirInfor'
        }
      },
      {
        path: 'LocationInfor',
        component: () => import('@/views/WareHouse/BasicData/LocationInfor'),
        name: 'LocationInfor',
        meta: {
          title: 'LocationInfor'
        }
      },
      {
        path: 'LocationRule',
        component: () => import('@/views/WareHouse/BasicData/LocationRule'),
        name: 'LocationRule',
        meta: {
          title: 'LocationRule'
        }
      }
      ]
    },
    {
      path: 'InventoryReport',
      component: () => import('@/views/WareHouse/InventoryReport'),
      name: 'InventoryReport',
      meta: {
        title: 'InventoryReport'
      }
    },
    {
      path: 'PdaAdministra',
      component: () => import('@/views/WareHouse/PdaAdministra'),
      name: 'PdaAdministra',
      meta: {
        title: 'PdaAdministra'
      }
    }
    ]
  },

  // 生产计划
  {
    path: '/ProductionPlan',
    component: Layout,
    redirect: '/ProductionPlan/ProducPlan',
    name: 'ProductionPlan',
    meta: {
      title: 'ProductionPlan',
      icon: 'tab'
    },
    children: [{
      path: 'ProducPlan',
      component: () => import('@/views/ProductionPlan/ProducPlan/ImprotPlan'),
      name: 'ProducPlan',
      meta: {
        title: 'ProducPlan'
      },
      redirect: '/ProductionPlan/ProducPlan/ImprotPlan',
      children: [{
        path: 'ImprotPlan',
        component: () => import('@/views/ProductionPlan/ProducPlan/ImprotPlan'),
        name: 'ImprotPlan',
        meta: {
          title: 'ImprotPlan'
        }
      },

      {
        path: 'ControlPlan',
        component: () => import('@/views/ProductionPlan/ProducPlan/ControlPlan'),
        name: 'ControlPlan',
        meta: {
          title: 'ControlPlan'
        }
      },
      {
        path: 'SplitPlan',
        component: () => import('@/views/ProductionPlan/ProducPlan/SplitPlan'),
        name: 'SplitPlan',
        meta: {
          title: 'SplitPlan'
        }
      },

      {
        path: 'ListPlan',
        component: () => import('@/views/ProductionPlan/ProducPlan/ListPlan'),
        name: 'ListPlan',
        meta: {
          title: 'ListPlan'
        }
      }
      ]
    },

    // 生产工单
    {
      path: 'OrderPlan',
      component: () => import('@/views/ProductionPlan/OrderPlan'),
      name: 'OrderPlan',
      meta: {
        title: 'OrderPlan'
      },
      redirect: '/ProductionPlan/OrderPlan/OrderQuery',
      children: [

        {
          path: 'OrderSend',
          component: () => import('@/views/ProductionPlan/OrderPlan/OrderSend'),
          name: 'OrderSend',
          meta: {
            title: 'OrderSend'
          }
        },

        {
          path: 'OrderMaintain',
          component: () => import('@/views/ProductionPlan/OrderPlan/OrderMaintain'),
          name: 'OrderMaintain',
          meta: {
            title: 'OrderMaintain'
          }
        },

        {
          path: 'OrderControl',
          component: () => import('@/views/ProductionPlan/OrderPlan/OrderControl'),
          name: 'OrderControl',
          meta: {
            title: 'OrderControl'
          }
        },

        {
          path: 'OrderQuery',
          component: () => import('@/views/ProductionPlan/OrderPlan/OrderQuery'),
          name: 'OrderQuery',
          meta: {
            title: 'OrderQuery'
          }
        }
      ]
    }
    ]
  },

  // 旧的--质量管理
  // {
  //   path: '/QualityData',
  //   component: Layout,
  //   redirect: '/QualityData/BasicData',
  //   name: 'QualityData',
  //   meta: {
  //     title: 'QualityData',
  //     icon: 'tab'
  //   },
  //   children: [{
  //     path: 'BasicData',
  //     component: () => import('@/views/QualityData/BasicData/index'),
  //     name: 'BasicData',
  //     meta: {
  //       title: 'BasicData'
  //     },
  //     redirect: '/QualityData/BasicData/MaterialDefects',
  //     children: [{
  //       path: 'MaterialDefects',
  //       component: () => import('@/views/QualityData/BasicData/MaterialDefects'),
  //       name: 'MaterialDefects',
  //       meta: {
  //         title: 'MaterialDefects'
  //       }
  //     },
  //     {
  //       path: 'IncomingInsp',
  //       component: () => import('@/views/QualityData/BasicData/IncomingInsp'),
  //       name: 'IncomingInsp',
  //       meta: {
  //         title: 'IncomingInsp'
  //       }
  //     },
  //     {
  //       path: 'MaterialInsp',
  //       component: () => import('@/views/QualityData/BasicData/MaterialInsp'),
  //       name: 'MaterialInsp',
  //       meta: {
  //         title: 'MaterialInsp'
  //       }
  //     },
  //     {
  //       path: 'MaterialInspDetail',
  //       component: () => import('@/views/QualityData/BasicData/MaterialInspDetail'),
  //       name: 'MaterialInspDetail',
  //       meta: {
  //         title: 'MaterialInspDetail'
  //       }
  //     },

  //     {
  //       path: 'ProductDefects',
  //       component: () => import('@/views/QualityData/BasicData/ProductDefects'),
  //       name: 'ProductDefects',
  //       meta: {
  //         title: 'ProductDefects'
  //       }
  //     },

  //     {
  //       path: 'ProductsLack',
  //       component: () => import('@/views/QualityData/BasicData/ProductsLack'),
  //       name: 'ProductsLack',
  //       meta: {
  //         title: 'ProductsLack'
  //       }
  //     },

  //     {
  //       path: 'ProductQuality',
  //       component: () => import('@/views/QualityData/BasicData/ProductQuality'),
  //       name: 'ProductQuality',
  //       meta: {
  //         title: 'ProductQuality'
  //       }
  //     },

  //     {
  //       path: 'ProductQualityDetail',
  //       component: () => import('@/views/QualityData/BasicData/ProductQualityDetail'),
  //       name: 'ProductQualityDetail',
  //       meta: {
  //         title: 'ProductQualityDetail'
  //       }
  //     }

  //     ]
  //   },
  //   {
  //     path: 'InspectionTask',
  //     component: () => import('@/views/QualityData/InspectionTask'),
  //     name: 'InspectionTask',
  //     meta: {
  //       title: 'InspectionTask'
  //     },
  //     redirect: '/QualityData/InspectionTask/ProcessInspec',
  //     children: [{
  //       path: 'ProcessInspec',
  //       component: () => import('@/views/QualityData/InspectionTask/ProcessInspec'),
  //       name: 'ProcessInspec',
  //       meta: {
  //         title: 'ProcessInspec'
  //       }
  //     },
  //     {
  //       path: 'FinishedInspec',
  //       component: () => import('@/views/QualityData/InspectionTask/FinishedInspec'),
  //       name: 'FinishedInspec',
  //       meta: {
  //         title: 'FinishedInspec'
  //       }
  //     }
  //     ]
  //   },
  //   {
  //     path: 'MobileInspection',
  //     component: () => import('@/views/QualityData/MobileInspection'),
  //     name: 'MobileInspection',
  //     meta: {
  //       title: 'MobileInspection'
  //     }
  //   }
  //   ]
  // },

  // 质量管理
  {
    path: '/QualityData',
    component: Layout,
    redirect: '/QualityData/MaterialParameter',
    name: 'QualityData',
    meta: {
      title: 'QualityData',
      icon: 'tab'
    },
    children: [{
      path: 'MaterialParameter',
      component: () => import('@/views/QualityData/MaterialParameter/index'),
      name: 'MaterialParameter',
      meta: {
        title: 'MaterialParameter'
      },
      redirect: '/QualityData/MaterialParameter/SamplingParam',
      // 抽检比例参数
      children: [{
        path: 'SamplingParam',
        component: () => import('@/views/QualityData/MaterialParameter/SamplingParam'),
        name: 'SamplingParam',
        meta: {
          title: 'SamplingParam'
        }
      },
      {
        path: 'IncomingParam',
        component: () => import('@/views/QualityData/MaterialParameter/IncomingParam'),
        name: 'IncomingParam',
        meta: {
          title: 'IncomingParam'
        }
      },
      {
        path: 'DefectParam',
        component: () => import('@/views/QualityData/MaterialParameter/DefectParam'),
        name: 'DefectParam',
        meta: {
          title: 'DefectParam'
        }
      },
      {
        path: 'DefectParamDetail',
        component: () => import('@/views/QualityData/MaterialParameter/DefectParamDetail'),
        name: 'DefectParamDetail',
        meta: {
          title: 'DefectParamDetail'
        }
      }

      ]
    },

    {
      path: 'ProcessParam',
      component: () => import('@/views/QualityData/ProcessParam'),
      name: 'ProcessParam',
      meta: {
        title: 'ProcessParam'
      },
      redirect: '/QualityData/ProcessParam/ProcessInspec',
      children: [{
        path: 'ProcessInspec',
        component: () => import('@/views/QualityData/ProcessParam/ProcessInspec'),
        name: 'ProcessInspec',
        meta: {
          title: 'ProcessInspec'
        }
      },
      {
        path: 'ProcessDefect',
        component: () => import('@/views/QualityData/ProcessParam/ProcessDefect'),
        name: 'ProcessDefect',
        meta: {
          title: 'ProcessDefect'
        }
      }
      ]
    }
    ]
  },

  // 设备管理
  {
    path: '/DeviceManage',
    component: Layout,
    redirect: '/DeviceManage/DeviceInfo',
    name: 'DeviceManage',
    meta: {
      title: 'DeviceManage',
      icon: 'tab'
    },
    children: [{
      path: 'DeviceInfo',
      component: () => import('@/views/DeviceManage/DeviceInfo/index'),
      name: 'DeviceInfo',
      meta: {
        title: 'DeviceInfo'
      },
      redirect: '/DeviceManage/DeviceInfo/DeviceType',
      children: [{
        path: 'DeviceType',
        component: () => import('@/views/DeviceManage/DeviceInfo/DeviceType'),
        name: 'DeviceType',
        meta: {
          title: 'DeviceType'
        }
      },
      {
        path: 'DeviceMaintain',
        component: () => import('@/views/DeviceManage/DeviceInfo/DeviceMaintain'),
        name: 'DeviceMaintain',
        meta: {
          title: 'DeviceMaintain'
        }
      },
      {
        path: 'DeviceBill',
        component: () => import('@/views/DeviceManage/DeviceInfo/DeviceBill'),
        name: 'DeviceBill',
        meta: {
          title: 'DeviceBill'
        }
      },
      {
        path: 'DeviceGrade',
        component: () => import('@/views/DeviceManage/DeviceInfo/DeviceGrade'),
        name: 'DeviceGrade',
        meta: {
          title: 'DeviceGrade'
        }
      }
      ]
    },
    // 设备保养管理
    {
      path: 'DeviceRepair',
      component: () => import('@/views/DeviceManage/DeviceRepair/index'),
      name: 'DeviceRepair',
      meta: {
        title: 'DeviceRepair'
      },
      redirect: '/DeviceManage/DeviceRepair/DeviceWarning',
      children: [{
        path: 'DeviceWarning',
        component: () => import('@/views/DeviceManage/DeviceRepair/DeviceWarning'),
        name: 'DeviceWarning',
        meta: {
          title: 'DeviceWarning'
        }
      },
      {
        path: 'DevicePlan',
        component: () => import('@/views/DeviceManage/DeviceRepair/DevicePlan'),
        name: 'DevicePlan',
        meta: {
          title: 'DevicePlan'
        }
      },
      {
        path: 'DeviceStart',
        component: () => import('@/views/DeviceManage/DeviceRepair/DeviceStart'),
        name: 'DeviceStart',
        meta: {
          title: 'DeviceStart'
        }
      },
      {
        path: 'DeviceResult',
        component: () => import('@/views/DeviceManage/DeviceRepair/DeviceResult'),
        name: 'DeviceResult',
        meta: {
          title: 'DeviceResult'
        }
      }
      ]
    },

    // 设备维修管理
    {
      path: 'MainManage',
      component: () => import('@/views/DeviceManage/MainManage/index'),
      name: 'MainManage',
      meta: {
        title: 'MainManage'
      },
      redirect: '/DeviceManage/MainManage/MainMange',
      children: [{
        path: 'MainMange',
        component: () => import('@/views/DeviceManage/MainManage/MainMange'),
        name: 'MainMange',
        meta: {
          title: 'MainMange'
        }
      },
      {
        path: 'AllDetail',
        component: () => import('@/views/DeviceManage/MainManage/AllDetail'),
        name: 'AllDetail',
        meta: {
          title: 'AllDetail'
        }
      },
      {
        path: 'MainDetail',
        component: () => import('@/views/DeviceManage/MainManage/MainDetail'),
        name: 'MainDetail',
        meta: {
          title: 'MainDetail'
        }
      }
      ]
    },

    // 设备备品备件
    {
      path: 'DeviceSpare',
      component: () => import('@/views/DeviceManage/DeviceSpare/index'),
      name: 'DeviceSpare',
      meta: {
        title: 'DeviceSpare'
      },
      redirect: '/DeviceManage/DeviceSpare/DevicePart',
      children: [{
        path: 'DevicePart',
        component: () => import('@/views/DeviceManage/DeviceSpare/DevicePart'),
        name: 'DevicePart',
        meta: {
          title: 'DevicePart'
        }
      }
      ]
    }
    ]
  },

  // 系统管理
  {
    path: '/SystemManagement',
    component: Layout,
    redirect: '/SystemManagement/index',
    name: 'SystemManagement',
    meta: {
      title: 'SystemManagement',
      icon: 'lock'
    },
    children: [{
      path: 'index',
      component: () => import('@/views/SystemManagement/index'),
      name: 'RolePermission',
      meta: {
        title: 'RolePermission'
      }
    },
    {
      path: 'userMangement',
      component: () => import('@/views/SystemManagement/userMangement'),
      name: 'userMangement',
      meta: {
        title: 'userMangement'
      }
    },
    {
      path: 'userCompany',
      component: () => import('@/views/SystemManagement/userCompany'),
      name: 'userCompany',
      meta: {
        title: 'userCompany'
      }
    }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    hidden: true,
    meta: {
      title: 'errorPages',
      icon: '404'
    },
    children: [{
      path: '401',
      component: () => import('@/views/error-page/401'),
      name: 'Page401',
      meta: {
        title: 'page401',
        noCache: true
      }
    },
    {
      path: '404',
      component: () => import('@/views/error-page/404'),
      name: 'Page404',
      meta: {
        title: 'page404',
        noCache: true
      }
    }
    ]
  },

  // 404 page must be placed at the end !!!
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () => new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
