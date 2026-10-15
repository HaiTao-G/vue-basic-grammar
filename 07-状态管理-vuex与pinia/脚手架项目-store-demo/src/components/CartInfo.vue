<template>
  <div class="box">
    <h3>购物车（组件 B）</h3>
    <p class="tip">
      和商品列表<b>没有任何 props / 事件往来</b>，数据全从 store 里读。
    </p>

    <div v-for="item in items" :key="item.id" class="row">
      <span class="name">{{ item.name }}</span>
      <!-- 加减只管传"变化量"，减到 0 自动删除的判断写在 store 的 action 里 -->
      <button @click="changeNum({ id: item.id, delta: -1 })">-</button>
      <span class="num">{{ item.num }}</span>
      <button @click="changeNum({ id: item.id, delta: 1 })">+</button>
      <button @click="remove(item.id)">删除</button>
    </div>

    <p v-if="!items.length" class="tip">购物车空空的</p>

    <div class="foot">
      <b>共 {{ count }} 件 ｜ 合计 ¥{{ total }}</b>
      <div>
        <button v-if="items.length" @click="clear">清空</button>
        <button @click="loadFromServer">拉取服务器数据</button>
      </div>
    </div>

    <p class="tip">summary（跨模块 getter，读到了根 state）：{{ summary }}</p>
  </div>
</template>

<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapGetters, mapActions } = createNamespacedHelpers("cart");

export default {
  name: "CartInfo",

  computed: {
    ...mapState(["items"]),
    ...mapGetters(["count", "total", "summary"]),
  },

  methods: {
    ...mapActions(["remove", "clear", "changeNum", "loadFromServer"]),
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
  .num {
    min-width: 20px;
    text-align: center;
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
