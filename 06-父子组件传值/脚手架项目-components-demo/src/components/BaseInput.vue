<template>
  <!--
    让自定义组件支持 v-model 的两条硬性约定（Vue 2）：
      1. 接收一个名叫 value 的 prop
      2. 数据变化时抛出名叫 input 的事件
    做到这两条，父组件就能直接写 v-model 了。
  -->
  <div class="wrap">
    <input
      :value="value"
      :placeholder="placeholder"
      @input="$emit('input', $event.target.value)"
    />
    <button @click="$emit('input', '')">清空</button>
  </div>
</template>

<script>
export default {
  name: "BaseInput",
  props: {
    value: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "请输入",
    },
  },
};
</script>

<style scoped>
.wrap {
  display: flex;
  gap: 8px;
  input {
    flex: 1;
    padding: 7px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
  }
  button {
    padding: 6px 14px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
