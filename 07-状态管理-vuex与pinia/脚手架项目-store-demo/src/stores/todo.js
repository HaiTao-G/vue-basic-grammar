import { defineStore } from "pinia";

export const useTodoStore = defineStore("todo", {
  state: () => ({
    list: [
      { id: 1, text: "学习 Pinia 的 state", done: true },
      { id: 2, text: "学习 Pinia 的 actions", done: false },
    ],
    filter: "all", // all / done / undone
    loading: false,
  }),

  getters: {
    doneCount(state) {
      return state.list.filter((t) => t.done).length;
    },
    undoneCount(state) {
      return state.list.filter((t) => !t.done).length;
    },
    // getter 也能依赖其它 getter
    progress() {
      if (!this.list.length) return "0%";
      return Math.round((this.doneCount / this.list.length) * 100) + "%";
    },
    visibleList(state) {
      if (state.filter === "done") return state.list.filter((t) => t.done);
      if (state.filter === "undone") return state.list.filter((t) => !t.done);
      return state.list;
    },
  },

  actions: {
    add(text) {
      const value = String(text).trim();
      if (!value) return;
      this.list.push({ id: Date.now(), text: value, done: false });
    },
    toggle(item) {
      item.done = !item.done;
    },
    remove(id) {
      this.list = this.list.filter((t) => t.id !== id);
    },
    // 批量修改：$patch 只触发一次更新
    markAllDone() {
      this.$patch((state) => {
        state.list.forEach((t) => (t.done = true));
        state.filter = "done";
      });
    },
    async loadFromServer() {
      this.loading = true;
      await new Promise((r) => setTimeout(r, 1000));
      this.list.push({ id: Date.now(), text: "从服务器拉取的待办", done: false });
      this.loading = false;
    },
  },
});
