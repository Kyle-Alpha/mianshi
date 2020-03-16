import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
import test from '@/views/login/test'
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
      meta:{title:'登录'}
    },
    {
      path: '/test',
      component: test,
      meta:{title:'测试'}
    }
  ]
})
export default router
