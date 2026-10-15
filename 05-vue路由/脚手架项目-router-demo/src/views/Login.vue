<template>
  <div>
    <h2>登录页（Login.vue）</h2>

    <p class="tip">
      未登录时访问 <code>/order</code> 或 <code>/user/1</code>，会被全局前置守卫拦到这里，
      并且地址栏会带上 <code>?redirect=原来想去的路径</code>。
      登录成功后会自动跳回那个页面。
    </p>

    <div class="form">
      <input v-model="username" placeholder="随便输个用户名" />
      <button @click="doLogin">登录</button>
    </div>

    <p class="tip">
      本次被拦截前的目标地址：
      <code>{{ $route.query.redirect || "（没有，是主动点进来的）" }}</code>
    </p>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
    };
  },
  methods: {
    doLogin() {
      if (!this.username.trim()) {
        alert("请输入用户名");
        return;
      }

      // 真实项目里 token 应该是后端返回的，这里简单模拟一下
      localStorage.setItem("token", "fake-token-" + Date.now());
      localStorage.setItem("username", this.username.trim());

      // 有 redirect 就回跳原页面，否则去首页
      const target = this.$route.query.redirect || "/home";

      // 用 replace：登录这步不该留下历史记录（后退不应该退回登录页）
      this.$router.replace(target);
    },
  },
};
</script>

<style scoped>
.form {
  display: flex;
  gap: 8px;
  margin: 12px 0;
  input {
    padding: 6px 10px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    width: 220px;
  }
  button {
    padding: 6px 18px;
    background: #409eff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
}
</style>
