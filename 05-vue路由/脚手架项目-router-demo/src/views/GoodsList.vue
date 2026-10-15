<template>
  <div>
    <h2>商品列表（GoodsList.vue）</h2>

    <p class="tip">
      顶部导航里有个「搜"手机"」链接，它跳的是
      <code>/goods?keyword=手机</code>。 这里用
      <code>this.$route.query.keyword</code> 把它读出来做过滤 ——
      这就是 <b>query 传参</b>：参数写在地址栏 ? 后面，刷新不丢。
    </p>

    <p>
      当前搜索词：<code>{{ keyword || "（无）" }}</code>
    </p>

    <ul class="list">
      <li v-for="item in filtered" :key="item.id">
        <span>{{ item.name }} —— ¥{{ item.price }}</span>

        <!-- params 传参：跳到 /goods/1 这种地址 -->
        <router-link :to="'/goods/' + item.id">查看详情(params)</router-link>

        <!-- query 传参：跳到 /goods?keyword=xxx -->
        <router-link :to="{ path: '/goods', query: { from: 'list' } }">
          带 query 跳转
        </router-link>
      </li>
    </ul>

    <p class="tip">
      两种传参怎么选：<b>params</b> 用于"我要看第 1 号商品"这种必须带的标识；
      <b>query</b> 用于搜索词、页码这类可选条件，刷新页面也不会丢。
    </p>
  </div>
</template>

<script>
export default {
  name: "GoodsList",
  data() {
    return {
      goods: [
        { id: 1, name: "小米手机", price: 1999 },
        { id: 2, name: "华为平板", price: 2999 },
        { id: 3, name: "苹果耳机", price: 899 },
        { id: 4, name: "联想笔记本", price: 5999 },
      ],
    };
  },
  computed: {
    keyword() {
      return this.$route.query.keyword || "";
    },
    filtered() {
      if (!this.keyword) return this.goods;
      return this.goods.filter((g) => g.name.includes(this.keyword));
    },
  },
};
</script>

<style scoped>
.list {
  list-style: none;
  padding: 0;
  li {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 0;
    border-bottom: 1px dashed #ebeef5;
    font-size: 14px;
  }
  a {
    color: #409eff;
    text-decoration: none;
    font-size: 13px;
  }
}
</style>
