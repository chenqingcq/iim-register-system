import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

// permissiom judge
// function hasPermission(roles, permissionRoles) {
//   if (roles.indexOf('admin') >= 0) return true // admin权限 直接通过
//   if (!permissionRoles) return true
//   return roles.some(role => permissionRoles.indexOf(role) >= 0)
// }

// register global progress.
// const whiteList = ['/register', '/authredirect']// 不重定向白名单
// router.beforeEach((to, from, next) => {
//   NProgress.start() // 开启Progress
//   if (getToken()) { // 判断是否有token
//     if (to.path === '/register') {
//       next({ path: '/' })
//       NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//     } else {
//       console.log('from', from)
//       console.log('to', to)
//       console.log('用户是否已拉取完user_info信息==src==', store.getters.roles.length === 0)
//       if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
//         store.dispatch('GetInfo').then(res => { // 拉取user_info
//           var roles = store.getters.roles
//           console.log(roles)
//           store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
//             router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
//             console.log(store.getters.addRouters)
//             console.log(2222222222)
//             next({ ...to }) // hack方法 确保addRoutes已完成
//           })
//         }).catch(() => {
//           store.dispatch('FedLogOut').then(() => {
//             Message.error('验证失败,请重新登录')
//             next({ path: '/register' })
//           })
//         })
//       } else {
//         // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
//         console.log('没有动态改变权限的需求可直接next() 删除下方权限判断 ↓', store.getters.roles, to.meta.role)
//         if (hasPermission(store.getters.roles, to.meta.role)) {
//           next()//
//         } else {
//           next({ path: '/401', query: { noGoBack: true }})
//           NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//         }
//         // 可删 ↑
//       }
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
//       next()
//     } else {
//       next('/register') // 否则全部重定向到登录页
//       NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
//     }
//   }
// })
// 
// router.afterEach(() => {
//   NProgress.done() // 结束Progress
// })
// 

// router.beforeEach((to, from, next) => {
  // next('')
  // })