// 命名空间模块：namespaced: true
// 加上之后，调用它里面的东西都要带前缀 "cart/"
// 好处：模块多了也不会重名打架
export default {
  namespaced: true,

  // 注意：state 写成函数，和组件的 data 一个道理（避免复用时共享引用）
  state: () => ({
    items: [],
  }),

  getters: {
    count(state) {
      return state.items.length;
    },
    total(state) {
      return state.items.reduce((sum, item) => sum + item.price * item.num, 0);
    },
    // getters 里可以读根级 state：第三个参数 rootState
    summary(state, getters, rootState) {
      return `${rootState.appName}：共 ${getters.count} 件，合计 ¥${getters.total}`;
    },
  },

  mutations: {
    ADD(state, goods) {
      const found = state.items.find((i) => i.id === goods.id);
      if (found) {
        found.num++;
      } else {
        state.items.push({ ...goods, num: 1 });
      }
    },
    REMOVE(state, id) {
      state.items = state.items.filter((i) => i.id !== id);
    },
    SET_NUM(state, { id, num }) {
      const found = state.items.find((i) => i.id === id);
      if (found) found.num = num;
    },
    CLEAR(state) {
      state.items = [];
    },
  },

  actions: {
    // 同步的 action：本质上只是把 mutation 包了一层
    add({ commit }, goods) {
      commit("ADD", goods);
    },

    // 异步 action：等 1 秒再入库，模拟请求后端
    addAsync({ commit }, goods) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("ADD", goods);
          resolve();
        }, 1000);
      });
    },

    // 改数量：减到 0 就自动删掉这条（业务判断放在 store 里，组件只管调用）
    changeNum({ commit, state }, { id, delta }) {
      const found = state.items.find((i) => i.id === id);
      if (!found) return;
      const next = found.num + delta;
      if (next <= 0) {
        commit("REMOVE", id);
      } else {
        commit("SET_NUM", { id, num: next });
      }
    },

    // 模拟从服务器拉取购物车
    async loadFromServer({ commit }) {
      await new Promise((r) => setTimeout(r, 800));
      commit("ADD", { id: 99, name: "服务器返回的赠品", price: 0, num: 1 });
    },
  },
};
