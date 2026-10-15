// 用户模块：演示异步 action（登录）
export default {
  namespaced: true,

  state: () => ({
    username: "",
    token: localStorage.getItem("token") || "",
  }),

  getters: {
    isLogin(state) {
      return !!state.token;
    },
    // 拼接显示用的昵称
    displayName(state) {
      return state.username || "游客";
    },
  },

  mutations: {
    SET_USER(state, { username, token }) {
      state.username = username;
      state.token = token;
    },
    LOGOUT(state) {
      state.username = "";
      state.token = "";
      localStorage.removeItem("token");
    },
  },

  actions: {
    // 模拟登录：1 秒后拿到 token
    login({ commit }, username) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (!username) {
            reject(new Error("请输入用户名"));
            return;
          }
          const token = "token-" + Date.now();
          localStorage.setItem("token", token);
          commit("SET_USER", { username, token });
          resolve();
        }, 1000);
      });
    },
    logout({ commit }) {
      commit("LOGOUT");
    },
  },
};
