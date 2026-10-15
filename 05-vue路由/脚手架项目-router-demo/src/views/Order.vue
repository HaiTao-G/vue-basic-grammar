<template>
  <div>
    <h2>我的订单（Order.vue）—— 需要登录才能看</h2>

    <p class="tip">
      这个页面在路由表里写了 <code>meta: { requiresAuth: true }</code>。
      你可以在顶栏点「退出」后，再访问一次 <code>/order</code>，
      会立刻被全局前置守卫弹回登录页，并且登录成功后自动回到这里。
    </p>

    <p>当前登录用户：<b>{{ username }}</b></p>

    <ul class="tip">
      <li>订单 2024001：小米手机 × 1</li>
      <li>订单 2024002：苹果耳机 × 2</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Order",
  computed: {
    username() {
      return localStorage.getItem("username") || "未知用户";
    },
  },
};
</script>
