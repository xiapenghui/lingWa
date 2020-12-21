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
        redirect: '/BasicData/ProductionManagement/ProcessMaintenance',
        children: [{
            path: 'ProcessMaintenance',
            component: () => import('@/views/BasicData/ProductionManagement/ProcessMaintenance'),
            name: 'ProcessMaintenance',
            meta: {
              title: 'ProcessMaintenance'
            }
          },

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
          },


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
        redirect: '/BasicData/ProductMmanagement/BomMangement',
        children: [

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
          },


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
        redirect: '/BasicData/MaterialManagement/MaterialInformation',
        children: [{
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

  // 质量管理
  {
    path: '/QualityData',
    component: Layout,
    redirect: '/QualityData/BasicData',
    name: 'QualityData',
    meta: {
      title: 'QualityData',
      icon: 'tab'
    },
    children: [{
        path: 'BasicData',
        component: () => import('@/views/QualityData/BasicData/index'),
        name: 'BasicData',
        meta: {
          title: 'BasicData'
        },
        redirect: '/QualityData/BasicData/MaterialDefects',
        children: [{
            path: 'MaterialDefects',
            component: () => import('@/views/QualityData/BasicData/MaterialDefects'),
            name: 'MaterialDefects',
            meta: {
              title: 'MaterialDefects'
            }
          },
          {
            path: 'IncomingInsp',
            component: () => import('@/views/QualityData/BasicData/IncomingInsp'),
            name: 'IncomingInsp',
            meta: {
              title: 'IncomingInsp'
            }
          },
          {
            path: 'MaterialInsp',
            component: () => import('@/views/QualityData/BasicData/MaterialInsp'),
            name: 'MaterialInsp',
            meta: {
              title: 'MaterialInsp'
            }
          },
          {
            path: 'MaterialInspDetail',
            component: () => import('@/views/QualityData/BasicData/MaterialInspDetail'),
            name: 'MaterialInspDetail',
            meta: {
              title: 'MaterialInspDetail'
            }
          },

          {
            path: 'ProductDefects',
            component: () => import('@/views/QualityData/BasicData/ProductDefects'),
            name: 'ProductDefects',
            meta: {
              title: 'ProductDefects'
            }
          },

          {
            path: 'ProductsLack',
            component: () => import('@/views/QualityData/BasicData/ProductsLack'),
            name: 'ProductsLack',
            meta: {
              title: 'ProductsLack'
            }
          },

          {
            path: 'ProductQuality',
            component: () => import('@/views/QualityData/BasicData/ProductQuality'),
            name: 'ProductQuality',
            meta: {
              title: 'ProductQuality'
            }
          },
          
          {
            path: 'ProductQualityDetail',
            component: () => import('@/views/QualityData/BasicData/ProductQualityDetail'),
            name: 'ProductQualityDetail',
            meta: {
              title: 'ProductQualityDetail'
            }
          },

        ]
      },
      {
        path: 'InspectionTask',
        component: () => import('@/views/QualityData/InspectionTask'),
        name: 'InspectionTask',
        meta: {
          title: 'InspectionTask'
        },
        redirect: '/QualityData/InspectionTasks'
      },
      {
        path: 'MobileInspection',
        component: () => import('@/views/QualityData/MobileInspection'),
        name: 'MobileInspection',
        meta: {
          title: 'MobileInspection'
        },
        redirect: '/QualityData/MobileInspection'
      }
    ]
  },

  // 参数信息
  {
    path: '/ParameterInfo',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/ParameterInfo/index'),
      name: 'ParameterInfo',
      meta: {
        title: 'ParameterInfo',
        icon: 'tab'

      }
    }]
  },
  // 标签管理
  {
    path: '/LabelManagement',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/LabelManagement/index'),
      name: 'LabelManagement',
      meta: {
        title: 'LabelManagement',
        icon: 'tab'

      }
    }]
  },

  // 生产计划
  {
    path: '/ProductionPlan',
    component: Layout,
    redirect: '/ProductionPlan/producPlan',
    name: 'ProductionPlan',
    meta: {
      title: 'ProductionPlan',
      icon: 'lock'
    },
    children: [{
        path: 'producPlan',
        component: () => import('@/views/ProductionPlan/producPlan'),
        name: 'producPlan',
        meta: {
          title: 'producPlan'
        }
      },
      {
        path: 'orderPlan',
        component: () => import('@/views/ProductionPlan/orderPlan'),
        name: 'orderPlan',
        meta: {
          title: 'orderPlan'
        }
      }
    ]
  },

  // 生产过程
  {
    path: '/ProductionManagements',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/ProductionManagements/index'),
      name: 'ProductionManagements',
      meta: {
        title: 'ProductionManagements',
        icon: 'tab'

      }
    }]
  },

  // 安灯管理
  {
    path: '/LampManagement',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/LampManagement/index'),
      name: 'LampManagement',
      meta: {
        title: 'LampManagement',
        icon: 'tab'

      }
    }]
  },

  // 质量管理
  {
    path: '/QualityAdministration',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/QualityAdministration/index'),
      name: 'QualityAdministration',
      meta: {
        title: 'QualityAdministration',
        icon: 'tab'
      }
    }]
  },
  // 设备管理
  {
    path: '/DeviceManagement',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/DeviceManagement/index'),
      name: 'DeviceManagement',
      meta: {
        title: 'DeviceManagement',
        icon: 'tab'

      }
    }]
  },
  // 报表看板
  {
    path: '/ReportBoard',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/ReportBoard/index'),
      name: 'ReportBoard',
      meta: {
        title: 'ReportBoard',
        icon: 'tab'

      }
    }]
  },
  // 数据集成
  {
    path: '/DataIntegration',
    component: Layout,
    children: [{
      path: 'index',
      component: () => import('@/views/DataIntegration/index'),
      name: 'DataIntegration',
      meta: {
        title: 'DataIntegration',
        icon: 'tab'

      }
    }]
  },
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
