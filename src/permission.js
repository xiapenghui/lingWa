import router from './router'
import store from './store'
// import { Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import {
//   getToken,
//   getRole
// } from '@/utils/auth' // get token from cookie
import {
  getToken
} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({
  showSpinner: false
}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  NProgress.start()
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  console.log('hasToken', hasToken)
  if (hasToken) {
    // console.log('to.path', to)
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      const hasGetRouter = store.state.permission.addRoutes
      // const hasGetRouter =  JSON.parse(localStorage.getItem('Admin-Menu'))
      console.log('hasGetRouter', hasGetRouter)
      if (hasGetRouter && hasGetRouter.length > 0) {
        next()
        console.log('123')
      } else {
        try {
          const accessRoutes = await store.dispatch('permission/generateRoutes')
          console.log(accessRoutes)
          router.addRoutes(accessRoutes)

          next({ ...to, replace: true })
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')

          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})
// router.beforeEach(async(to, from, next) => {
//   NProgress.start()
//   document.title = getPageTitle(to.meta.title)
//   const hasToken = getToken()

//   // 如果是访问登录界面，如果token存在，代表已登录过，跳转到主页
//   if (hasToken) {
//     const accessRoutes = await store.dispatch('permission/generateRoutes', getRole())
//     // console.log(accessRoutes)
//     router.addRoutes(accessRoutes)
//     if (to.path === '/login') {
//       next({
//         path: '/'
//       })
//     } else {
//       // 否则，跳转到登录页面

//       next()
//     }
//   }
// })

router.afterEach(() => {
  NProgress.done()
})
