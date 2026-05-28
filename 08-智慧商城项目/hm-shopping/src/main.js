import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入按需导入的配置文件
import '@/utils/vant-ui'

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
