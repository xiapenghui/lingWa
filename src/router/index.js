import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import tableRouter from './modules/table'
import nestedRouter from './modules/nested'

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
},
// 基础数据
{
  path: '/BasicData',
  component: Layout,
  redirect: '/BasicData/OrganizationalManagement/CompanyMaintenance',
  alwaysShow: true,
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
      redirect: '/BasicData/ProductionManagement/LineMaintenance',
      children: [{
        path: 'LineMaintenance',
        component: () => import('@/views/BasicData/ProductionManagement/LineMaintenance'),
        name: 'LineMaintenance',
        meta: {
          title: 'LineMaintenance'
        }
      },
      {
        path: 'WorkMaintenance',
        component: () => import('@/views/BasicData/ProductionManagement/WorkMaintenance'),
        name: 'WorkMaintenance',
        meta: {
          title: 'WorkMaintenance'
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

    // 产品信息管理
    {
      path: 'ProductMmanagement',
      component: () => import('@/views/BasicData/ProductMmanagement/index'), // Parent router-view
      name: 'ProductMmanagement',
      meta: {
        title: 'ProductMmanagement'
      },
      redirect: '/BasicData/ProductMmanagement/BomMangement',
      children: [{
        path: 'BomMangement',
        component: () => import('@/views/BasicData/ProductMmanagement/BomMangement'),
        name: 'BomMangement',
        meta: {
          title: 'BomMangement'
        }
      },
      {
        path: 'RouteMaintenance',
        component: () => import('@/views/BasicData/ProductMmanagement/RouteMaintenance'),
        name: 'RouteMaintenance',
        meta: {
          title: 'RouteMaintenance'
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
    }
  ]},
// 参数信息{
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
  }]},// 标签管理{
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
  }]},
// 生产计划{
  path: '/ProductionPlan',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/ProductionPlan/index'),
    name: 'ProductionPlan',
    meta: {
      title: 'ProductionPlan',
      icon: 'tab'
    }
  }]},// 生产过程{
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
  }]},// 安灯管理{  path: '/LampManagement',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/LampManagement/index'),    name: 'LampManagement',    meta: {      title: 'LampManagement',      icon: 'tab'    }  }]},
// 质量管理{  path: '/QualityAdministration',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/QualityAdministration/index'),    name: 'QualityAdministration',    meta: {      title: 'QualityAdministration',      icon: 'tab'    }  }]},// 设备管理{  path: '/DeviceManagement',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/DeviceManagement/index'),    name: 'DeviceManagement',    meta: {      title: 'DeviceManagement',      icon: 'tab'    }  }]},// 报表看板{  path: '/ReportBoard',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/ReportBoard/index'),    name: 'ReportBoard',    meta: {      title: 'ReportBoard',      icon: 'tab'    }  }]},// 数据集成{  path: '/DataIntegration',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/DataIntegration/index'),    name: 'DataIntegration',    meta: {      title: 'DataIntegration',      icon: 'tab'    }  }]}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 系统管理
export const asyncRoutes = [{  path: '/SystemManagement',  component: Layout,  redirect: '/SystemManagement/index',  alwaysShow: true, // will always show the root menu  name: 'Permission',  meta: {    title: 'SystemManagement',    icon: 'lock',    roles: ['admin'] // you can set roles in root nav  },  children: [{    path: 'index',    component: () => import('@/views/SystemManagement/index'),    name: 'RolePermission',    meta: {      title: 'rolePermission',      roles: ['admin']    }  },  {    path: 'lookUser',    hidden: true,    component: () => import('@/views/SystemManagement/lookUser'),    name: 'lookUser',    meta: {      title: 'lookUser',      roles: ['admin']    }  },  {    path: 'userMangement',    component: () => import('@/views/SystemManagement/userMangement'),    name: 'userMangement',    meta: {      title: 'userMangement',      roles: ['admin']    }  }  ]},
/** when your routing map is too long, you can split it into small modules **/nestedRouter,tableRouter,
{  path: '/tab',  component: Layout,  children: [{    path: 'index',    component: () => import('@/views/tab/index'),    name: 'Tab',    meta: {      title: 'tab',      icon: 'tab'    }  }]},
{  path: '/error',  component: Layout,  redirect: 'noRedirect',  name: 'ErrorPages',  hidden: true,  meta: {    title: 'errorPages',    icon: '404'  },  children: [{    path: '401',    component: () => import('@/views/error-page/401'),    name: 'Page401',    meta: {      title: 'page401',      noCache: true    }  },  {    path: '404',    component: () => import('@/views/error-page/404'),    name: 'Page404',    meta: {      title: 'page404',      noCache: true    }  }  ]},{  path: '/excel',  component: Layout,  redirect: '/excel/export-excel',  name: 'Excel',  meta: {    title: 'excel',    icon: 'excel'  },  children: [{    path: 'export-excel',    component: () => import('@/views/excel/export-excel'),    name: 'ExportExcel',    meta: {      title: 'exportExcel'    }  },  {    path: 'export-selected-excel',    component: () => import('@/views/excel/select-excel'),    name: 'SelectExcel',    meta: {      title: 'selectExcel'    }  },  {    path: 'export-merge-header',    component: () => import('@/views/excel/merge-header'),    name: 'MergeHeader',    meta: {      title: 'mergeHeader'    }  },  {    path: 'upload-excel',    component: () => import('@/views/excel/upload-excel'),    name: 'UploadExcel',    meta: {      title: 'uploadExcel'    }  },  {    path: 'newTree',    component: () => import('@/views/excel/newTree'),    name: 'newTree',    meta: {      title: 'newTree'    }  }  ]},
// 404 page must be placed at the end !!!{  path: '*',  redirect: '/404',  hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
