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
  component: Layout,
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
  component: Layout,
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
}
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// 系统管理
export const asyncRoutes = [{
  path: '/SystemManagement',
  component: Layout,
  redirect: '/SystemManagement/index',
  alwaysShow: true, // will always show the root menu
  name: 'Permission',
  meta: {
    title: 'SystemManagement',
    icon: 'lock',
    roles: ['admin', 'editor'] // you can set roles in root nav
  },
  children: [
    {
      path: 'index',
      component: () => import('@/views/SystemManagement/index'),
      name: 'RolePermission',
      meta: {
        title: 'rolePermission',
        roles: ['admin']
      }
    },
    {
      path: 'lookUser',
      hidden: true,
      component: () => import('@/views/SystemManagement/lookUser'),
      name: 'lookUser',
      meta: {
        title: 'lookUser',
        roles: ['admin']
      }
    }
  ]
},

/** when your routing map is too long, you can split it into small modules **/
nestedRouter,
tableRouter,

{
  path: '/tab',
  component: Layout,
  children: [{
    path: 'index',
    component: () => import('@/views/tab/index'),
    name: 'Tab',
    meta: {
      title: 'tab',
      icon: 'tab'
    }
  }]
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
{
  path: '/excel',
  component: Layout,
  redirect: '/excel/export-excel',
  name: 'Excel',
  meta: {
    title: 'excel',
    icon: 'excel'
  },
  children: [{
    path: 'export-excel',
    component: () => import('@/views/excel/export-excel'),
    name: 'ExportExcel',
    meta: {
      title: 'exportExcel'
    }
  },
  {
    path: 'export-selected-excel',
    component: () => import('@/views/excel/select-excel'),
    name: 'SelectExcel',
    meta: {
      title: 'selectExcel'
    }
  },
  {
    path: 'export-merge-header',
    component: () => import('@/views/excel/merge-header'),
    name: 'MergeHeader',
    meta: {
      title: 'mergeHeader'
    }
  },
  {
    path: 'upload-excel',
    component: () => import('@/views/excel/upload-excel'),
    name: 'UploadExcel',
    meta: {
      title: 'uploadExcel'
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
