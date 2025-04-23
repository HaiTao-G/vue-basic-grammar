//引入vue
import Vue from 'vue'
//引入 App
import App from './App.vue'

//阻止vue生产提示
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: h => h(App),
  //钩子：创建前
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线
  }
})
