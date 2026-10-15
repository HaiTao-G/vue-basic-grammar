<template>
  <div id="app">
    <header class="nav">
      <span class="logo">状态管理实验室</span>
      <router-link to="/vuex">Vuex 篇</router-link>
      <router-link to="/pinia">Pinia 篇</router-link>
      <span class="spacer"></span>
      <span class="tip-text">
        两个 store 同时挂在同一个 Vue 实例上，可以随时切换对比
      </span>
    </header>

    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  background: #f5f7fa;
  color: #303133;
  font-family: "Microsoft YaHei", Arial, sans-serif;
}
#app {
  max-width: 1080px;
  margin: 0 auto;
  padding: 20px;
}
.nav {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #fff;
  border-radius: 6px;
  margin-bottom: 16px;
  .logo {
    font-weight: bold;
    color: #409eff;
  }
  .spacer {
    flex: 1;
  }
  .tip-text {
    font-size: 13px;
    color: #909399;
  }
  a {
    color: #606266;
    text-decoration: none;
    font-size: 14px;
    padding: 4px 10px;
    border-radius: 4px;
    &.router-link-active {
      background: #ecf5ff;
      color: #409eff;
      font-weight: bold;
    }
  }
}
.box {
  background: #fff;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}
h2 {
  font-size: 17px;
  margin: 0 0 10px;
}
h3 {
  font-size: 15px;
  margin: 0 0 8px;
}
.tip {
  font-size: 13px;
  color: #909399;
  line-height: 1.8;
  code {
    background: #f5f7fa;
    padding: 1px 5px;
    border-radius: 3px;
    color: #409eff;
  }
}
button {
  padding: 6px 12px;
  font-size: 13px;
  border: 1px solid #dcdfe6;
  background: #fff;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 8px;
  margin-bottom: 6px;
  &:hover {
    border-color: #409eff;
    color: #409eff;
  }
}
</style>
