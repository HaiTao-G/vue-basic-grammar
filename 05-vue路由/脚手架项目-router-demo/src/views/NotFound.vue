<template>
  <div>
    <h2>404 —— 页面走丢了</h2>

    <p class="tip">
      你在 router/index.js 最后看到的那条 <code>path: "*"</code> 就是通配符路由，
      所有前面匹配不上的地址都会落到这里。
      <b>它必须放在路由表最后一条</b>，否则会把后面的路由全拦住。
    </p>

    <p>
      你访问的地址是：<code>{{ $route.fullPath }}</code>
    </p>

    <button @click="$router.push('/home')">回首页</button>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
button {
  padding: 6px 18px;
  background: #409eff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
