// 引入Vue
import Vue from 'vue'
// 引入App组件，它是所有组件的父组件
import App from './App.vue'
// 引入store
import store from './store/index'

// 阻止Vue在启动时生成生产提示
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store, // 通过store选项将store挂载到Vue实例上
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线
  }
}).$mount('#app')
