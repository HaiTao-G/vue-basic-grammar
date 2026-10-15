<template>
  <div class="counter">
    <!--
      注意：这里【没有】直接改 count（props 是只读的）。
      而是抛出 update:count 事件，让父组件去改。
      父组件写 :count.sync="num" 时，Vue 会自动帮它监听 update:count
      并赋值 —— 这就是 .sync 语法糖的本质。
    -->
    <button @click="$emit('update:count', count - 1)">-</button>
    <span class="num">{{ count }}</span>
    <button @click="$emit('update:count', count + 1)">+</button>
    <span class="tip">（子组件内部显示的值来自 props：{{ count }}）</span>
  </div>
</template>

<script>
export default {
  name: "CounterBox",
  props: {
    count: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.counter {
  display: flex;
  align-items: center;
  gap: 10px;
  button {
    width: 32px;
    height: 32px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }
  .num {
    min-width: 32px;
    text-align: center;
    font-weight: bold;
  }
  .tip {
    font-size: 13px;
    color: #909399;
  }
}
</style>
