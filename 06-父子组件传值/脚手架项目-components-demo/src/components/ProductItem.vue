<template>
  <div class="item">
    <span class="name">{{ item.name }}</span>
    <span class="price">¥{{ item.price }}</span>

    <!-- 子组件不自己改数据，而是"报告"：有人把我加进购物车了 -->
    <button @click="add">加入购物车</button>
  </div>
</template>

<script>
export default {
  name: "ProductItem",

  // ===== props 完整校验写法 =====
  props: {
    item: {
      type: Object, // 类型必须是对象
      required: true, // 必须传
      // 自定义校验：不符合会在控制台报错
      validator(value) {
        return value && typeof value.name === "string" && value.price > 0;
      },
    },
    // 带默认值的简单 props
    btnText: {
      type: String,
      default: "加入购物车",
    },
  },

  methods: {
    add() {
      // 第一个参数是事件名，第二个是要带出去的数据
      this.$emit("add-to-cart", this.item);
    },
  },
};
</script>

<style scoped>
.item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 14px;
  .name {
    flex: 1;
  }
  .price {
    color: #f56c6c;
  }
  button {
    padding: 4px 10px;
    font-size: 13px;
    border: 1px solid #409eff;
    background: #ecf5ff;
    color: #409eff;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
