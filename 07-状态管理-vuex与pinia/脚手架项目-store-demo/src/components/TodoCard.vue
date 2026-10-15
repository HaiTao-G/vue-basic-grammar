<template>
  <div class="box">
    <h3>待办清单（Pinia）</h3>

    <div class="add">
      <input v-model="draft" placeholder="输入待办，回车添加" @keyup.enter="handleAdd" />
      <button @click="handleAdd">添加</button>
    </div>

    <div class="filters">
      <button
        v-for="f in filters"
        :key="f.value"
        :class="{ active: todo.filter === f.value }"
        @click="todo.filter = f.value"
      >
        {{ f.label }}
      </button>
    </div>

    <div v-for="item in todo.visibleList" :key="item.id" class="row">
      <input type="checkbox" :checked="item.done" @change="todo.toggle(item)" />
      <span :class="{ done: item.done }">{{ item.text }}</span>
      <button @click="todo.remove(item.id)">删除</button>
    </div>

    <p v-if="!todo.visibleList.length" class="tip">当前筛选下没有内容</p>

    <div class="foot">
      <span class="tip">
        已完成 {{ todo.doneCount }} / {{ todo.list.length }} ｜ 进度
        <b>{{ todo.progress }}</b>
      </span>
      <div>
        <button @click="todo.markAllDone()">全部标记完成</button>
        <button :disabled="todo.loading" @click="todo.loadFromServer()">
          {{ todo.loading ? "加载中..." : "拉取服务器待办" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useTodoStore } from "@/stores/todo";

export default {
  name: "TodoCard",

  setup() {
    const todo = useTodoStore();

    // 输入框内容属于"组件自己的临时状态"，不需要放进 store
    const draft = ref("");

    // 筛选按钮的配置也是组件私有的
    const filters = ref([
      { label: "全部", value: "all" },
      { label: "已完成", value: "done" },
      { label: "未完成", value: "undone" },
    ]);

    function handleAdd() {
      if (!draft.value.trim()) return;
      todo.add(draft.value);
      draft.value = "";
    }

    return { todo, draft, filters, handleAdd };
  },
};
</script>

<style scoped>
.add {
  display: flex;
  gap: 8px;
  margin-bottom: 10px;
  input {
    flex: 1;
    padding: 6px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
}
.filters {
  margin-bottom: 10px;
  .active {
    border-color: #409eff;
    color: #409eff;
    background: #ecf5ff;
  }
}
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 5px 0;
  font-size: 14px;
  border-bottom: 1px dashed #ebeef5;
  .done {
    text-decoration: line-through;
    color: #c0c4cc;
  }
}
.foot {
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
