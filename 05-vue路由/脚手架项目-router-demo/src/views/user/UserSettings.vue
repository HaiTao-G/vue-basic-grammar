<template>
  <div>
    <h3>设置（UserSettings.vue）</h3>
    <p class="tip">
      这个子路由单独写了 <code>meta: { title: "账号设置" }</code>。
      后置钩子 afterEach 里用 <code>to.matched</code> 倒着往上找标题，
      所以子页面没写 title 时会用父级的，写了就用子级自己的。
    </p>
    <p>当前浏览器标签标题是：<b>{{ title }}</b></p>
  </div>
</template>

<script>
export default {
  name: "UserSettings",
  computed: {
    title() {
      return document.title;
    },
  },
};
</script>
