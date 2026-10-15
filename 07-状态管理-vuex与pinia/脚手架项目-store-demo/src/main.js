import Vue from "vue";
import App from "./App.vue";
import router from "./router";

// Vuex 的 store（src/store/index.js）
import store from "./store";

// Pinia
import { createPinia, PiniaVuePlugin } from "pinia";

Vue.config.productionTip = false;

// ⚠️ 在 Vue 2 里用 Pinia 必须装这个插件，否则组件里拿不到 store
Vue.use(PiniaVuePlugin);

const pinia = createPinia();

new Vue({
  router,
  store, // Vuex：注入后组件里可用 this.$store
  pinia, // Pinia：注入后组件里可用 useXxxStore()
  render: (h) => h(App),
}).$mount("#app");
