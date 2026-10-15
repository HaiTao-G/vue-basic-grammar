<template>
  <div>
    <h2>首页（Home.vue）</h2>
    <p class="tip">
      这是最普通的一个页面组件。脚手架里每个页面就是一个
      <code>.vue</code> 单文件组件，由 <code>router-view</code> 负责渲染。
    </p>

    <ul class="tip">
      <li>顶部导航用的是 <b>router-link</b>（声明式导航）</li>
      <li>按钮里用的是 <b>this.$router.push</b>（编程式导航）</li>
      <li>地址栏 /shop 是 /home 的<b>别名</b>，渲染的还是这个组件</li>
      <li>
        /old-goods/8 会<b>重定向</b>到 /goods/8，可以手动在地址栏试一下
      </li>
    </ul>

    <p>
      当前页面路径：<code>{{ $route.path }}</code>
    </p>
  </div>
</template>

<script>
export default {
  name: "Home",
};
</script>
