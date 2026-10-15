<template>
  <div>
    <div class="box">
      <h2>Pinia 篇（Pinia 2 + Vue 2.7）</h2>
      <p class="tip">
        和 Vuex 相比最大的区别：<b>没有 mutations</b>。想改数据直接在 action
        里改，或者<code>store.count++</code> 这样直接改，少了整整一层模板代码。
      </p>
      <p class="tip">
        本页用 Vue 2.7 的 <code>setup()</code> 获取 store，写法和 Vue 3 基本一致，
        学完可以直接迁移。
      </p>
    </div>

    <div class="cols">
      <!-- 这两个子组件各自 useXxxStore()，不需要父组件传任何东西 -->
      <CounterCard />
      <TodoCard />
    </div>

    <div class="box">
      <h2>$subscribe：监听 store 变化</h2>
      <p class="tip">
        Pinia 自带订阅能力，不用像 Vuex 那样手写
        <code>subscribe</code> 或 watch。下面这些日志是自动记录的：
      </p>
      <ul class="logs">
        <li v-for="(l, i) in logs" :key="i">{{ l }}</li>
      </ul>
      <p v-if="!logs.length" class="tip">去上面点几个按钮试试。</p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useCounterStore } from "@/stores/counter";
import { useTodoStore } from "@/stores/todo";
import CounterCard from "@/components/CounterCard";
import TodoCard from "@/components/TodoCard";

export default {
  name: "PiniaDemo",
  components: { CounterCard, TodoCard },

  setup() {
    // 拿到 store 实例（和 Vue 3 里一模一样的写法）
    const counter = useCounterStore();
    const todo = useTodoStore();

    const logs = ref([]);
    function record(msg) {
      const time = new Date().toLocaleTimeString();
      logs.value.unshift(`[${time}] ${msg}`);
      if (logs.value.length > 8) logs.value.pop();
    }

    // 订阅 state 变化：任何 state 改动都会触发
    counter.$subscribe(() => {
      record(`counter 变了，现在是 ${counter.count}`);
    });
    todo.$subscribe(() => {
      record(`todo 变了，已完成 ${todo.doneCount} 条`);
    });

    return { logs, record };
  },
};
</script>

<style scoped>
.cols {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
  & > * {
    flex: 1;
  }
}
.logs {
  list-style: none;
  padding: 0;
  margin: 0;
  font-size: 13px;
  li {
    padding: 4px 0;
    border-bottom: 1px dashed #ebeef5;
    color: #606266;
  }
}
</style>
