<template>
  <div>
    <h2>个人中心（UserLayout.vue）—— 嵌套路由的父页面</h2>

    <p class="tip">
      地址是 <code>/user/{{ $route.params.id }}/xxx</code>。
      父页面负责外壳（标题 + 子导航），子页面渲染在下面的
      <code>router-view</code> 里。 父的 <code>meta.requiresAuth</code> 为
      true，所以<b>所有子页面都会被守卫保护</b>。
    </p>

    <nav class="sub">
      <!-- 子路由跳转：注意用完整路径或具名路由 -->
      <router-link :to="'/user/' + $route.params.id + '/profile'">
        资料
      </router-link>
      <router-link :to="'/user/' + $route.params.id + '/posts'">
        动态
      </router-link>
      <router-link :to="'/user/' + $route.params.id + '/settings'">
        设置
      </router-link>
    </nav>

    <!-- 二级路由出口：子页面渲染到这里 -->
    <div class="child">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "UserLayout",
};
</script>

<style scoped>
.sub {
  margin: 12px 0;
  a {
    margin-right: 14px;
    color: #606266;
    text-decoration: none;
    font-size: 14px;
    &.router-link-active {
      color: #409eff;
      font-weight: bold;
    }
  }
}
.child {
  padding: 14px;
  background: #fafafa;
  border: 1px dashed #dcdfe6;
  border-radius: 4px;
}
</style>
