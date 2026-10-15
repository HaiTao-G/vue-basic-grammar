<template>
  <div class="panel">
    <h2>购物车（子组件）</h2>

    <p class="tip">
      <code>cart</code> 和 <code>total</code> 都是父组件算好传进来的。
      这里所有操作都只是<b>抛事件</b>，真正改数据的是父组件。
    </p>

    <div v-for="item in cart" :key="item.id" class="row">
      <span class="name">{{ item.name }}</span>

      <button @click="$emit('change-count', { id: item.id, delta: -1 })">
        -
      </button>
      <span class="count">{{ item.count }}</span>
      <button @click="$emit('change-count', { id: item.id, delta: 1 })">
        +
      </button>

      <span class="sub">小计 ¥{{ item.price * item.count }}</span>
      <button class="del" @click="$emit('remove', item.id)">删除</button>
    </div>

    <p v-if="!cart.length" class="tip">购物车是空的，去左边加点东西。</p>

    <div class="footer">
      <b>合计：¥{{ total }}</b>
      <button v-if="cart.length" @click="$emit('clear')">清空</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPanel",

  props: {
    cart: {
      type: Array,
      required: true,
    },
    total: {
      type: Number,
      default: 0,
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
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
  border-bottom: 1px dashed #ebeef5;
  font-size: 14px;
  .name {
    flex: 1;
  }
  .count {
    min-width: 24px;
    text-align: center;
  }
  .sub {
    color: #f56c6c;
    font-size: 13px;
  }
  button {
    padding: 2px 10px;
    border: 1px solid #dcdfe6;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
    &.del {
      color: #f56c6c;
      border-color: #fbc4c4;
    }
  }
}
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  button {
    padding: 6px 14px;
    border: 1px solid #f56c6c;
    color: #f56c6c;
    background: #fff;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
