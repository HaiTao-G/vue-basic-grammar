<template>
  <div>
    <h2>商品详情（GoodsDetail.vue）</h2>

    <p class="tip">
      路由配置里写了 <code>props: true</code>，所以这里的
      <code>id</code> 是<b>直接用 props 接收</b>的，组件内部完全没出现
      <code>$route</code>。 好处：这个组件挪到任何地方都能复用，只要传个 id
      就行。
    </p>

    <p v-if="goods">
      商品编号：<b>{{ id }}</b> ｜ 名称：<b>{{ goods.name }}</b> ｜ 价格：<b
        >¥{{ goods.price }}</b
      >
    </p>
    <p v-else class="tip">没有找到编号 {{ id }} 的商品</p>

    <div class="ops">
      <button @click="$router.push('/goods/' + (Number(id) + 1))">
        看下一个商品（/goods/{{ Number(id) + 1 }}）
      </button>
      <button @click="$router.back()">返回上一页</button>
    </div>

    <p class="tip">
      点"看下一个商品"时，地址从 /goods/1 变成 /goods/2，
      但 vue-router 会<b>复用同一个组件实例</b>，created 不会重新执行。
      这时要响应参数变化，用 <code>watch: { id }</code> 或
      <code>beforeRouteUpdate</code>（本文件里两种都写了，看控制台输出）。
    </p>
  </div>
</template>

<script>
const ALL = {
  1: { name: "小米手机", price: 1999 },
  2: { name: "华为平板", price: 2999 },
  3: { name: "苹果耳机", price: 899 },
  4: { name: "联想笔记本", price: 5999 },
};

export default {
  name: "GoodsDetail",

  // props: true 的写法 —— id 由路由参数自动注入
  props: {
    id: {
      type: [String, Number],
      required: true,
    },
  },

  data() {
    return {
      goods: null,
    };
  },

  watch: {
    // 方式一：监听 id 变化（组件被复用时也能拿到最新值）
    id: {
      immediate: true, // 第一次进来就执行一次
      handler(val) {
        console.log("[watch id] 参数变成", val);
        this.goods = ALL[String(val)] || null;
      },
    },
  },

  // 方式二：组件内守卫（组件被复用时触发）
  beforeRouteUpdate(to, from, next) {
    console.log("[beforeRouteUpdate]", from.params.id, "->", to.params.id);
    next();
  },
};
</script>

<style scoped>
.ops {
  margin: 12px 0;
  button {
    margin-right: 8px;
    padding: 6px 12px;
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
