<template>
  <div class="panel">
    <h2>商品列表（子组件 · 中间层）</h2>

    <p class="tip">
      这个组件自己也不持有数据：<code>list</code> 是 App 传进来的 props，
      它再往下传给 ProductItem，并把 ProductItem 抛出的事件<b>原样转发</b>给 App。
    </p>

    <ProductItem
      v-for="item in list"
      :key="item.id"
      :item="item"
      @add-to-cart="$emit('add-to-cart', $event)"
    />

    <p v-if="!list.length" class="tip">暂无商品</p>
  </div>
</template>

<script>
import ProductItem from "./ProductItem";

export default {
  name: "ProductList",
  components: { ProductItem },

  props: {
    // 只在局部用，不需要层层传递时，校验就够用了
    list: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.panel {
  background: #fff;
  padding: 16px;
  border-radius: 6px;
}
</style>
