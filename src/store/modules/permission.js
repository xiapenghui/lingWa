import {
  constantRoutes
} from '@/router'
import {
  ListMenu
} from '@/api/user'
import Layout from '@/layout'
import {
  Message
} from 'element-ui'
// import { getMenu, setMenu } from '@/utils/auth'
/**
 * 后台查询的菜单数据拼装成路由格式的数据
 * 这里是demo使用的是以前项目的后台数据，这里强制修改了一下
 * @param routes
 */
export function generaMenu(routes, data, parent, parents) {
  data.forEach(item => {
    let menu
    const viewpath = parent
    if (parent === '#') {
      menu = {
        path: item.path,
        component: Layout,
        children: [],
        redirect: `${item.path}/${item.children[0].path}`,
        meta: {
          title: item.meta ? item.meta.title : item.name,
          icon: item.meta.icon ? item.meta.icon : null
        }
      }
    } else {
      if (parent !== '#' && parents === '#') {
        menu = {
          path: item.path,
          component: loadView(viewpath, item.path),
          children: [],
          name: item.path,
          meta: {
            title: item.meta ? item.meta.title : item.name
          }
        }
      } else {
        const str = parents + '/' + viewpath
        menu = {
          path: item.path,
          component: loadView(str, item.path),
          children: [],
          name: item.path,
          meta: {
            title: item.meta ? item.meta.title : item.name
          }
        }
      }
    }

    if (item.children && item.children.length > 0) {
      generaMenu(menu.children, item.children, item.path, parent)
    }
    routes.push(menu)
  })

  return routes
}

export const loadView = (parent, path) => { // 路由懒加载
  return (resolve) => require([`@/views${parent}/${path}`], resolve)
  // return () => import(`@/views${parent}/${path}/index`)
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    console.log('routes', constantRoutes.concat(routes))
    state.routes = constantRoutes.concat(routes)
  }

}

const actions = {

  generateRoutes({
    commit
  }, roles) {
    return new Promise(resolve => {
      const loadMenuData = []
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
          const data = response.Obj
          Object.assign(loadMenuData, data)
          const routes = []
          console.log('loadMenuData', loadMenuData)
          const newRouter = generaMenu(routes, loadMenuData, '#')
          console.log('a', newRouter)

          const accessedRoutes = newRouter
          // if (roles.includes('admin')) {
          //   accessedRoutes = asyncRoutes || []
          // } else {
          //   accessedRoutes = routes
          // }
          console.log('accessedRoutes', accessedRoutes)
          commit('SET_ROUTES', accessedRoutes)
          const str = JSON.stringify(accessedRoutes)
          console.log('str', typeof str)

          localStorage.setItem('Admin-Menu', str)
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
