import {
  constantRoutes,
  errorRoutes
} from '@/router'
import {
  ListMenu
} from '@/api/user'
import Layout from '@/layout'
import {
  Message
} from 'element-ui'

/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * 这里是demo使用的是以前项目的后台数据，这里强制修改了一下
 * @param routes
 */
export function generaMenu(routes, data, parent) {
  data.forEach(item => {
    let menu
    let viewpath
    if (parent === '/BasicData') {
      viewpath = '/OrganizationalManagement'
    } else {
      viewpath = parent
    }
    if (parent === '#') {
      menu = {
        path: item.path,
        component: Layout,
        children: [],
        redirect: `${item.path}/${item.children[0].path}`,
        meta: {
          title: item.name,
          icon: item.icon
        }
      }
    } else {
      menu = {
        path: item.path,
        component: loadView(viewpath, item.path),
        children: [],
        name: item.path,
        meta: {
          title: item.name
        }
      }
    }
    if (item.children) {
      generaMenu(menu.children, item.children, item.path)
    }
    routes.push(menu)
  })

  return routes
}

export const loadView = (parent, path) => { // 路由懒加载
  return (resolve) => require([`@/views${parent}/${path}/index`], resolve)
  // return () => import(`@/views${parent}/${path}/index`)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    console.log('routes', routes)
    state.routes = constantRoutes.concat(routes).concat(errorRoutes)
  }

}

const actions = {

  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      // const loadMenuData = []
      // 先查询后台并返回左侧菜单数据并把数据添加到路由
      ListMenu().then(response => {
        if (response.IsPass !== true) {
          Message({
            message: '菜单数据加载异常',
            type: 0,
            duration: 2 * 1000
          })
        } else {
          console.log('response', response.Obj)
          // const data = response.Obj
          // Object.assign(loadMenuData, data)
          // const routes = []
          // const a = generaMenu(routes, loadMenuData, '#')
          // console.log('a', a)
          const data = [{
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
            ]
          }]
          const accessedRoutes = data
          // if (roles.includes('admin')) {
          //   accessedRoutes = asyncRoutes || []
          // } else {
          //   accessedRoutes = routes
          // }
          console.log('accessedRoutes', accessedRoutes)
          commit('SET_ROUTES', accessedRoutes)
          resolve(accessedRoutes)
        }
      }).catch(error => {
        console.log(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
