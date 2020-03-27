import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from '@/router/index'
// 导入 Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/filters/filters'
// 导入全局状态管理
import store from '@/store'
// 全局组件
import enterpriseSelect from '@/components/enterpriseSelect'
import subjectSelect from '@/components/subjectSelect'
Vue.component('enterpriseSelect', enterpriseSelect)
Vue.component('subjectSelect', subjectSelect)
Vue.use(ElementUI)
// 导入全局样式
import '@/style/index.css'
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
