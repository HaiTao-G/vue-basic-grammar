<template>
  <div id="app">
    <!-- ========== 顶部导航 ========== -->
    <header class="nav">
      <span class="logo">Vue Router 实验室</span>

      <!-- 声明式导航：router-link 默认渲染成 <a> 标签 -->
      <router-link to="/home">首页</router-link>
      <router-link to="/about">关于</router-link>
      <router-link to="/goods">商品列表</router-link>

      <!-- to 也可以写成对象（推荐，路径改了也不怕） -->
      <router-link :to="{ name: 'goodsDetail', params: { id: 1 } }">
        商品1
      </router-link>

      <!-- query 传参：地址栏变成 /goods?keyword=手机 -->
      <router-link :to="{ path: '/goods', query: { keyword: '手机' } }">
        搜"手机"
      </router-link>

      <router-link :to="{ name: 'userProfile', params: { id: 1 } }">
        个人中心(需登录)
      </router-link>
      <router-link to="/order">我的订单(需登录)</router-link>
      <router-link to="/some-wrong-path">故意访问错路径(404)</router-link>

      <span class="spacer"></span>
      <span class="user">{{ token ? "已登录" : "未登录" }}</span>
      <button v-if="token" class="link-btn" @click="logout">退出</button>
      <router-link v-else to="/login">登录</router-link>
    </header>

    <!-- ========== 当前路由信息面板：直观看到 $route 里都有啥 ========== -->
    <div class="route-info">
      <b>当前 $route：</b>
      path=<code>{{ $route.path }}</code>
      name=<code>{{ $route.name }}</code>
      params=<code>{{ $route.params }}</code>
      query=<code>{{ $route.query }}</code>
      fullPath=<code>{{ $route.fullPath }}</code>
      matched层级=<code>{{ $route.matched.length }}</code>
    </div>

    <!-- ========== 编程式导航演示 ========== -->
    <div class="btns">
      <button @click="$router.push('/about')">push 去关于页（有历史记录）</button>
      <button @click="$router.replace('/about')">
        replace 去关于页（不留记录）
      </button>
      <button @click="$router.go(-1)">go(-1) 后退一页</button>
      <button @click="goDetail">push 对象写法去商品2</button>
    </div>

    <!-- ========== 路由出口：匹配的页面会渲染到这里 ========== -->
    <main class="page">
      <!-- 加 key 是为了让动态参数变化时组件重新渲染 -->
      <router-view :key="$route.fullPath" />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      token: localStorage.getItem("token") || "",
    };
  },
  watch: {
    // 每次路由变化后重新读一次登录态（登录/退出后顶栏能马上更新）
    $route() {
      this.token = localStorage.getItem("token") || "";
    },
  },
  methods: {
    goDetail() {
      // 编程式导航的对象写法：用 name 跳转，不用手写路径
      this.$router.push({ name: "goodsDetail", params: { id: 2 } });
    },
    logout() {
      localStorage.removeItem("token");
      this.token = "";
      // 退出后回到首页
      this.$router.push("/home");
    },
  },
};
</script>

<style lang="less">
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  font-family: "Microsoft YaHei", Arial, sans-serif;
  background: #f5f7fa;
  color: #303133;
}
#app {
  max-width: 1000px;
  margin: 0 auto;
}
.nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  padding: 12px 16px;
  background: #fff;
  border-bottom: 1px solid #e4e7ed;
  .logo {
    font-weight: bold;
    color: #409eff;
    margin-right: 8px;
  }
  .spacer {
    flex: 1;
  }
  .user {
    font-size: 13px;
    color: #909399;
  }
  a {
    color: #606266;
    text-decoration: none;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 4px;
    &.router-link-active {
      color: #409eff;
      background: #ecf5ff;
      font-weight: bold;
    }
  }
  .link-btn {
    border: none;
    background: none;
    color: #f56c6c;
    cursor: pointer;
    font-size: 14px;
  }
}
.route-info {
  margin: 12px 0;
  padding: 10px 14px;
  background: #fdf6ec;
  border: 1px solid #faecd8;
  border-radius: 4px;
  font-size: 13px;
  line-height: 1.8;
  code {
    background: #fff;
    padding: 1px 5px;
    border-radius: 3px;
    color: #e6a23c;
    margin-right: 6px;
  }
}
.btns {
  margin-bottom: 12px;
  button {
    margin-right: 8px;
    margin-bottom: 6px;
    padding: 6px 12px;
    font-size: 13px;
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
.page {
  background: #fff;
  padding: 20px;
  border-radius: 6px;
  min-height: 260px;
  margin-bottom: 30px;
}
h2 {
  margin-top: 0;
  font-size: 18px;
}
.tip {
  font-size: 13px;
  color: #909399;
  line-height: 1.8;
}
</style>
