import Vue from "vue";
import Vuex from "vuex";

// 拆分成模块
import cart from "./modules/cart";
import user from "./modules/user";

// ⚠️ 注意这里：用 npm 包 + import 的方式，必须手动 Vue.use(Vuex)
// （HTML 版里引入的 CDN 版本会自动安装，写了反而会报 "already installed"）
Vue.use(Vuex);

export default new Vuex.Store({
  // strict 模式：任何绕过 mutation 直接改 state 的行为都会报错
  // 只在开发环境开，上线要关掉（它会深度监听 state，有性能开销）
  strict: process.env.NODE_ENV !== "production",

  // ===== 根级 state =====
  state: {
    appName: "Vuex 练习",
  },

  // ===== 根级 getters（可以理解为 store 里的计算属性）=====
  getters: {
    welcome(state) {
      return `欢迎使用 ${state.appName}`;
    },
  },

  // ===== 根级 mutations（唯一改 state 的地方，必须同步）=====
  mutations: {
    SET_APP_NAME(state, name) {
      state.appName = name;
    },
  },

  // ===== 根级 actions（可以写异步，改数据还是得 commit）=====
  actions: {
    renameApp({ commit }, name) {
      setTimeout(() => {
        commit("SET_APP_NAME", name);
      }, 500);
    },
  },

  // ===== 注册模块 =====
  modules: {
    cart,
    user,
  },
});
