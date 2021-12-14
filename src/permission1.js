import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

// 动态路由添加'/auth-redirect'
const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {

  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // const hasGetUserInfo = store.getters.name
      // 动态路由
      console.log("store.getters",store.state.permission.addRoutes)
   //    const hasGetUserInfo = store.getters.name && store.getters.permission_routes.length > 0;
	  // console.log("hasGetUserInfo",hasGetUserInfo)
    let hasGetRouter = store.state.permission.addRoutes;
      if (hasGetRouter.length>0) {
        next()
      } else {
        try {
          
          // get user info
          // await store.dispatch('user/getInfo')
          // next()

          // 配置动态路由
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          // const accessRoutes = await store.dispatch('permission/generateRoutes', contact_name)
          console.log("accessRoutes",accessRoutes)
          
console.log("to",router.addRoutes(accessRoutes))
          router.addRoutes(accessRoutes)

          // next({ ...to, replace: true })
         next({ path: '/' })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')

          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
       }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
