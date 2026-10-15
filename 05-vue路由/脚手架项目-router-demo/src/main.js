import Vue from "vue";
import App from "./App.vue";
import router from "./router";

Vue.config.productionTip = false;

new Vue({
  router, // 注入路由后，所有组件里都能用 this.$router / this.$route
  render: (h) => h(App),
}).$mount("#app");
