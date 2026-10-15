<template>
  <div class="card">
    <span>子组件内部计数：<b>{{ count }}</b></span>
    <button @click="count++">自己 +1</button>

    <!-- 不带参数的事件 -->
    <button @click="$emit('say-hi', '你好，我是 ChildCard')">
      抛事件 say-hi（带一句话）
    </button>
  </div>
</template>

<script>
export default {
  name: "ChildCard",
  data() {
    return {
      count: 0,
    };
  },
  methods: {
    // 这个方法专门给父组件用 $refs 调用
    reset() {
      this.count = 0;
      console.log("[ChildCard] reset() 被调用了");
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  button {
    padding: 5px 12px;
    font-size: 13px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      border-color: #409eff;
      color: #409eff;
    }
  }
}
</style>
