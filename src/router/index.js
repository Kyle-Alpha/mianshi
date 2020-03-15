import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '@/views/login/login'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: login
    }
  ]
})
export default router
