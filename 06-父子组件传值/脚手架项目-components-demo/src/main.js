import Vue from "vue";
import App from "./App.vue";

Vue.config.productionTip = false;

// 这个练习不涉及路由，所以只挂 App 就够了
new Vue({
  render: (h) => h(App),
}).$mount("#app");
