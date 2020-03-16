import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false
import router from '@/router'
// 导入 Element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 导入全局样式
import '@/style/index.css'
new Vue({
  render: h => h(App),
  router
}).$mount('#app')
