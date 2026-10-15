<template>
  <div>
    <div class="box">
      <h2>Vuex 篇（Vuex 3）</h2>
      <p class="tip">
        下面 <b>GoodsList</b> 和 <b>CartInfo</b> 是两个<b>毫无父子关系</b>的兄弟组件。
        用第 06 章的 props/$emit 就没法直接通信了 —— 这正是状态管理库要解决的问题：
        把共享数据放进 store，谁都能读、都能改。
      </p>
      <p class="tip">
        appName（根 state）：<b>{{ appName }}</b> ｜ welcome（根 getter）：<b>{{
          welcome
        }}</b>
      </p>
      <!-- dispatch 的第二个参数会传给 action -->
      <button @click="renameApp('Vuex 真香')">
        dispatch 异步改名（0.5 秒后生效）
      </button>
    </div>

    <div class="cols">
      <!-- 兄弟组件 A：负责"加入购物车" -->
      <GoodsList />
      <!-- 兄弟组件 B：负责"展示购物车" -->
      <CartInfo />
    </div>

    <div class="box">
      <h2>登录（user 模块的异步 action）</h2>
      <p class="tip">
        当前用户：<b>{{ displayName }}</b> ｜ 是否已登录：<b>{{ isLogin }}</b>
      </p>
      <div v-if="!isLogin">
        <input v-model="username" placeholder="输入用户名" />
        <button @click="doLogin">登录（等 1 秒）</button>
      </div>
      <button v-else @click="logout">退出登录</button>
    </div>

    <div class="box">
      <h2>strict 模式：直接改 state 会被抓到</h2>
      <p class="tip">
        store 里开了 <code>strict: true</code>，只要你绕过 mutation 直接改
        state，控制台就会报错。点下面的按钮试试。
      </p>
      <button @click="tryDirectModify">绕过 mutation 直接改 state</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import GoodsList from "@/components/GoodsList";
import CartInfo from "@/components/CartInfo";

export default {
  name: "VuexDemo",
  components: { GoodsList, CartInfo },

  data() {
    return {
      username: "",
    };
  },

  computed: {
    // 根级 state / getters：数组写法，名字和 store 里保持一致
    ...mapState(["appName"]),
    ...mapGetters(["welcome"]),

    // 命名空间模块：第一个参数写模块名
    // ⚠️ 这里不能用 mapState("user", ["username"])，会和上面 data 里的 username 撞名
    //    这种时候就用对象写法起个别名
    ...mapState("user", { storeUsername: "username" }),
    ...mapGetters("user", ["isLogin", "displayName"]),
  },

  methods: {
    ...mapActions(["renameApp"]),
    ...mapActions("user", ["login", "logout"]),

    async doLogin() {
      if (!this.username.trim()) return alert("请输入用户名");
      await this.login(this.username.trim());
      this.username = "";
    },

    tryDirectModify() {
      try {
        // 故意绕过 mutation
        this.$store.state.cart.items.push({ id: 999, name: "违规数据", price: 1, num: 1 });
      } catch (e) {
        alert("被 strict 模式抓到了：\n" + e.message);
      }
    },
  },
};
</script>

<style scoped>
.cols {
  display: flex;
  gap: 16px;
  align-items: flex-start;
  margin-bottom: 16px;
  & > * {
    flex: 1;
  }
}
input {
  padding: 6px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
