<template>
  <div class="box">
    <h3>计数器（Pinia）</h3>

    <p class="tip">
      这个子组件<b>自己</b>调用 <code>useCounterStore()</code> 拿数据，
      父组件没有给它传任何 props —— 这就是 store 的好处。
    </p>

    <p>count = <b>{{ count }}</b> ｜ double（getter）= <b>{{ double }}</b></p>
    <p class="tip">{{ desc }}</p>

    <div>
      <button @click="counter.increment(1)">+1</button>
      <button @click="counter.incrementAsync()">异步 +10（等 0.8s）</button>
      <button @click="counter.$reset()">$reset 重置</button>
      <button @click="counter.$patch({ count: 100 })">$patch 直接改成 100</button>
    </div>

    <p class="tip warn">
      ⚠️ 坑：解构 store 时<b>必须</b>用 <code>storeToRefs</code>。
      <code>const { count } = store</code> 会丢失响应式（值永远停在初始值）。
      本文件用的是正确写法，见下面 script 里的注释。
    </p>
  </div>
</template>

<script>
import { useCounterStore } from "@/stores/counter";
import { storeToRefs } from "pinia";

export default {
  name: "CounterCard",

  setup() {
    const counter = useCounterStore();

    // ❌ 错误写法：这样解构出来的是普通数字，不会更新
    // const { count, double } = counter;

    // ✅ 正确写法：storeToRefs 会把 state / getter 转成 ref，响应式不丢
    //    （注意：action 不要放进来，直接通过 counter.xxx() 调用即可）
    const { count, double, desc } = storeToRefs(counter);

    return { counter, count, double, desc };
  },
};
</script>

<style scoped>
.warn {
  background: #fdf6ec;
  padding: 8px 12px;
  border-radius: 4px;
  color: #e6a23c;
}
</style>
