// Just a mock data

const constantRoutes = [
  {
    path: '/redirect',
    component: 'layout/Layout',
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: 'views/redirect/index'
      }
    ]
  },
  {
    path: '/login',
    component: 'views/login/index',
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: 'views/login/auth-redirect',
    hidden: true
  },
  {
    path: '/404',
    component: 'views/error-page/404',
    hidden: true
  },
  {
    path: '/401',
    component: 'views/error-page/401',
    hidden: true
  },
  {
    path: '',
    component: 'layout/Layout',
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: 'views/dashboard/index',
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', affix: true }
      }
    ]
  },
  // 基础数据
  {
    path: '/BasicData',
    children: [{
      path: 'index',
      component: () => import('@/views/BasicData/index'),
      name: 'BasicData',
      meta: {
        title: 'BasicData',
        icon: 'tab'
      }
    }]
  },
  // 生产计划
  {
    path: '/ProductionPlan',
    children: [{
      path: 'index',
      component: () => import('@/views/ProductionPlan/index'),
      name: 'ProductionPlan',
      meta: {
        title: 'ProductionPlan',
        icon: 'tab'
      }
    }]
  },
  // 生产管理
  {
    path: '/ProductionManagement',
    children: [{
      path: 'index',
      component: () => import('@/views/ProductionManagement/index'),
      name: 'ProductionManagement',
      meta: {
        title: 'ProductionManagement',
        icon: 'tab'
      }
    }]
  },
  // 品质管理
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
  }

]

const asyncRoutes = [
  {
    path: '/SystemManagement',
    component: 'layout/Layout',
    redirect: '/SystemManagement/index',
    alwaysShow: true,
    meta: {
      title: 'SystemManagement',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'index',
        component: 'views/SystemManagement/index',
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['admin']
        }
      }
    ]
  },

  {
    path: '/tab',
    component: 'layout/Layout',
    children: [
      {
        path: 'index',
        component: 'views/tab/index',
        name: 'Tab',
        meta: { title: 'tab', icon: 'tab' }
      }
    ]
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
    children: [
      {
        path: 'export-excel',
        component: 'views/excel/export-excel',
        name: 'ExportExcel',
        meta: { title: 'exportExcel' }
      },
      {
        path: 'export-selected-excel',
        component: 'views/excel/select-excel',
        name: 'SelectExcel',
        meta: { title: 'selectExcel' }
      },
      {
        path: 'export-merge-header',
        component: 'views/excel/merge-header',
        name: 'MergeHeader',
        meta: { title: 'mergeHeader' }
      },
      {
        path: 'upload-excel',
        component: 'views/excel/upload-excel',
        name: 'UploadExcel',
        meta: { title: 'uploadExcel' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

module.exports = {
  constantRoutes,
  asyncRoutes
}
