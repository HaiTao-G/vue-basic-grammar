<template>
  <div>
    <h3>资料（UserProfile.vue）</h3>
    <p class="tip">
      访问 <code>/user/1</code> 时，父路由里那条
      <code>{ path: "", redirect: { name: "userProfile" } }</code>
      会把你自动送到这个子页面 —— 这就是<b>子路由的默认展示页</b>写法。
    </p>
    <p>用户编号：{{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: "UserProfile",
};
</script>
