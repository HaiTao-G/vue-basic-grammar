import { defineStore } from "pinia";

/**
 * Pinia 的选项式写法，和 Vuex 的 state/getters/actions 一一对应：
 *   Vuex 的 state    -> Pinia 的 state（必须是函数 return）
 *   Vuex 的 getters  -> Pinia 的 getters
 *   Vuex 的 mutations + actions -> Pinia 只有 actions（同步异步都能写）
 *
 * 第一个参数是 store 的唯一 id，devtools 里显示的就是它
 */
export const useCounterStore = defineStore("counter", {
  state: () => ({
    count: 0,
    title: "Pinia 计数器",
  }),

  getters: {
    // 用 state 计算，有缓存；也能用 this 访问其它 getter
    double: (state) => state.count * 2,
    desc() {
      return `${this.title}：当前 ${this.count}，两倍是 ${this.double}`;
    },
  },

  actions: {
    increment(step = 1) {
      // Pinia 里可以直接改 state，不需要 commit
      this.count += step;
    },
    // 异步 action：写法和普通 async 函数一样
    async incrementAsync() {
      await new Promise((r) => setTimeout(r, 800));
      this.count += 10;
    },
    reset() {
      // $reset 只能重置选项式 store 的初始 state
      this.$reset();
    },
  },
});
