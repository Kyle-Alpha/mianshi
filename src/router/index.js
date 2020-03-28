import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/index/home'
import children from './children'

import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: login,
      meta: { title: '登录' }
    },
    {
      path: '/home',
      component: home,
      meta: { title: '主页',roles:['超级管理员', '管理员', '老师', '学生'] },
      // redirect: '/home/chart',
      children
    },

    {
      path: '*',
      redirect: '/login'
    }
  ]
})
import { info } from '@/api/home'
import store from '@/store/index.js'
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })
//路由导航守卫
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') return next()
  const { data } = await info()
  if (data.code === 206) return next('/login')
  if (!data.data.status) {
    Message.warning('该账号未激活，请联系管理员')
    return
  } else {
    if (!to.meta.roles.includes(data.data.role)) {
      Message.warning('你无权访问该页面')
      console.log(from.path);
      return next(from.path)
    }
  }
  let avatar = process.env.VUE_APP_URL + '/' + data.data.avatar
  let username = data.data.username
  let role = data.data.role
  store.commit('setInfo', { avatar, username, role })
  NProgress.start()
  next()
})
router.afterEach(to => {
  document.title = to.meta.title
  NProgress.done()
})
export default router
