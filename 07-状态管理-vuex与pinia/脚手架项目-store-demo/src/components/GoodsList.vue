<template>
  <div class="box">
    <h3>商品列表（组件 A）</h3>
    <p class="tip">
      点"加入购物车"时，它<b>不向父组件抛事件</b>，而是直接
      <code>dispatch</code> 给 store。购物车那边（组件 B）自动就更新了。
    </p>

    <div v-for="g in goods" :key="g.id" class="row">
      <span class="name">{{ g.name }}</span>
      <span class="price">¥{{ g.price }}</span>
      <button @click="add(g)">加入购物车</button>
      <button @click="addAsync(g)">异步加入（1s）</button>
    </div>
  </div>
</template>

<script>
// createNamespacedHelpers：模块名只写一次，后面四个 map 都自动带上前缀
// 等价于 mapActions("cart", ["add"]) 这种写法，模块名多的时候更省事
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("cart");

export default {
  name: "GoodsList",

  data() {
    return {
      goods: [
        { id: 1, name: "小米手机", price: 1999 },
        { id: 2, name: "华为平板", price: 2999 },
        { id: 3, name: "苹果耳机", price: 899 },
      ],
    };
  },

  methods: {
    ...mapActions(["add", "addAsync"]),
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 14px;
  .name {
    flex: 1;
  }
  .price {
    color: #f56c6c;
  }
}
</style>
