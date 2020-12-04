// Just a mock data

const constantRoutes = [{
  path: '/redirect',
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
}, {
  path: '/auth-redirect',
  component: () => import('@/views/login/auth-redirect'),
  hidden: true
}, {
  path: '/404',
  component: () => import('@/views/error-page/404'),
  hidden: true
}, {
  path: '/401',
  component: () => import('@/views/error-page/401'),
  hidden: true
}
]

const asyncRoutes = [
  {
    path: '/',
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
  },
  // 基础数据
  {
    path: '/BasicData',
    redirect: '/BasicData/OrganizationalManagement/CompanyMaintenance',
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
            component: () => import('@/views/BasicData/ProductMmanagement/BomMangement/BomMangementDetaile'),
            name: 'BomMangementDetaile',
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
            component: () => import('@/views/BasicData/ProductMmanagement/RouteMaintenance/RouteMaintenanceDetaile'),
            name: 'RouteMaintenanceDetaile',
            meta: {
              title: 'RouteMaintenanceDetaile'
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
        redirect: '/BasicData/ProductionManagement/LineMaintenance',
        children: [
          {
            path: 'LineMaintenance',
            component: () => import('@/views/BasicData/ProductionManagement/LineMaintenance'),
            name: 'LineMaintenance',
            meta: {
              title: 'LineMaintenance'
            }
          },

          {
            path: 'FactoryInfo',
            component: () => import('@/views/BasicData/ProductionManagement/FactoryInfo'),
            name: 'FactoryInfo',
            meta: {
              title: 'FactoryInfo'
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

          {
            path: 'ProcessMaintenance',
            component: () => import('@/views/BasicData/ProductionManagement/ProcessMaintenance'),
            name: 'ProcessMaintenance',
            meta: {
              title: 'ProcessMaintenance'

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
        }
        ]
      }
    ]
  },

  // 参数信息
  {
    path: '/ParameterInfo',
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
    component: 'layout/Layout',
    redirect: '/SystemManagement/index',
    meta: {
      title: 'SystemManagement',
      icon: 'lock',
      roles: ['Admin', 'editor']
    },
    children: [{
      path: 'index',
      component: 'views/SystemManagement/index',
      name: 'RolePermission',
      meta: {
        title: 'rolePermission',
        roles: ['Admin']
      }
    }]
  },

  {
    path: '/tab',
    component: 'layout/Layout',
    children: [{
      path: 'index',
      component: 'views/tab/index',
      name: 'Tab',
      meta: {
        title: 'tab',
        icon: 'tab'
      }
    }]
  },

  {
    path: '/excel',
    component: 'layout/Layout',
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'excel',
      icon: 'excel'
    },
    children: [{
      path: 'export-excel',
      component: 'views/excel/export-excel',
      name: 'ExportExcel',
      meta: {
        title: 'exportExcel'
      }
    },
    {
      path: 'export-selected-excel',
      component: 'views/excel/select-excel',
      name: 'SelectExcel',
      meta: {
        title: 'selectExcel'
      }
    },
    {
      path: 'export-merge-header',
      component: 'views/excel/merge-header',
      name: 'MergeHeader',
      meta: {
        title: 'mergeHeader'
      }
    },
    {
      path: 'upload-excel',
      component: 'views/excel/upload-excel',
      name: 'UploadExcel',
      meta: {
        title: 'uploadExcel'
      }
    }
    ]
  },

  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
