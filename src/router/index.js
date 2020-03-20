import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import home from '@/views/index/home'
import children from './children';
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
      meta: { title: '主页' },
      children
    }
  ]
})
import { getToken } from '@/utils/token'
//路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') return next()
  if (!getToken()) return next('/login')
  next()
})
export default router
