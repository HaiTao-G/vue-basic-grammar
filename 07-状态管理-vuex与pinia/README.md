# 07 - 状态管理（Vuex 与 Pinia）

> 学习目标：当多个组件要共享同一份数据时（跨层级、兄弟组件之间），
> 学会把它们抽到"中央仓库"（store）里统一管理，并掌握 Vue 2 生态里的两个方案：
> **Vuex**（老牌官方方案）和 **Pinia**（新一代，Vue 3 官方推荐，也支持 Vue 2.7）。

## 一、为什么需要状态管理

| 场景                       | 用什么                              |
| -------------------------- | ----------------------------------- |
| 父传子、子传父             | props / $emit（见 06 章）           |
| 跨层级、兄弟组件共享数据   | 一层层传太痛苦 → 用 store           |
| 多个页面都要用的数据       | 登录用户信息、购物车、主题设置      |

一句话：**把"大家都要用的数据"放到一个公共仓库，谁用谁来取，谁改都走仓库的规矩。**

## 二、学习前提与引入顺序（很重要）

| 库       | 本地文件               | 版本   | 说明                          |
| -------- | ---------------------- | ------ | ----------------------------- |
| Vue      | `../js/vue.js`         | 2.7.16 | 必须**最先**引入              |
| Vuex     | `../js/vuex.js`        | 3.6.2  | 检测到全局 Vue 会**自动安装** |
| vue-demi | `../js/vue-demi.js`    | 0.14.6 | Pinia 的桥接层，**必须**引入  |
| Pinia    | `../js/pinia.js`       | 2.1.7  | 需要**手动**安装插件          |

**Vuex 的引入方式：**

```html
<script src="../js/vue.js"></script>
<script src="../js/vuex.js"></script>
<!-- 注意：Vuex 3 的 UMD 版本会自动 Vue.use(Vuex)，不要再手动写一遍，否则会报 already installed -->
```

**Pinia 的引入方式（顺序不能错）：**

```html
<script src="../js/vue.js"></script>
<script src="../js/vue-demi.js"></script>
<!-- vue-demi 负责把 Vue 2.7 的 Composition API 桥接给 Pinia -->
<script src="../js/pinia.js"></script>
<script>
  // Pinia 必须手动安装插件
  Vue.use(Pinia.PiniaVuePlugin);
  const pinia = Pinia.createPinia();
  new Vue({ el: "#app", pinia });
</script>
```

> 为什么 Pinia 要 vue-demi：Pinia 是为 Vue 3 的 Composition API 设计的，
> vue-demi 让它在 Vue 2.7（内置 Composition API）上也能跑。这是 Vue 2 项目用 Pinia 的标准做法。

## 三、文件清单（建议按顺序学）

| 文件                                  | 内容                                   | 关键知识点                                     |
| ------------------------------------- | -------------------------------------- | ---------------------------------------------- |
| `01-Vuex入门-state与getters.html`     | 建仓库，多个组件共享同一份数据         | `new Vuex.Store`、`state`、`getters`、`$store`  |
| `02-Vuex-mutations与actions.html`     | 规范地修改 state                       | `commit`、`dispatch`、同步 vs 异步、严格模式    |
| `03-Vuex-辅助函数与模块.html`         | 少写样板代码 / 拆分子仓库              | `mapState`、`mapGetters`、`mapMutations`、`modules` |
| `04-Pinia入门-state与getters.html`    | Pinia 版仓库                           | `defineStore`、`createPinia`、`setup()`、`storeToRefs` |
| `05-Pinia-actions与异步.html`         | Pinia 改数据与异步                     | actions 直接改、`$patch`、`$reset`、异步         |
| `06-Vuex与Pinia对比与选型.html`       | 同一功能两套实现并列对比               | 该用哪个、怎么选                                |

## 四、核心概念对照

| 概念         | Vuex                              | Pinia                              |
| ------------ | --------------------------------- | ---------------------------------- |
| 定义仓库     | `new Vuex.Store({...})`           | `defineStore('id', {...})`         |
| 安装         | 自动 / `Vue.use(Vuex)`            | `Vue.use(PiniaVuePlugin)` + `createPinia()` |
| 状态         | `state`                           | `state`                            |
| 派生数据     | `getters`                         | `getters`                          |
| **改状态的唯一入口** | **`mutations`（必须同步）** | **`actions`（同步异步都行）**      |
| 异步         | `actions`（内部 commit）          | `actions` 里直接改                 |
| 组件里改     | `commit` / `dispatch`             | 直接调 action 或改 store           |
| 拆分子模块   | `modules` + `namespaced`          | 直接建多个 store                   |
| 状态可追踪   | mutation 是唯一入口，天然好追踪   | 也很好（devtools 支持）            |

**Pinia 最核心的简化**：取消了 `mutations`，改状态直接写在 `actions` 里（或者干脆直接改）。
Vuex 里"想改数据必须 commit 一个 mutation"是强制规定，Pinia 把它去掉了。

## 五、易错点提醒

1. **Vuex 里不能直接改 `state`**。严格模式下 `this.$store.state.count++` 会直接报错，必须 `commit`。
2. **`mutations` 必须是同步函数**。里面写 `setTimeout`、发请求，devtools 就追踪不到真实变化了，异步一律放 `actions`。
3. **Vuex 的 UMD 会自动安装**，别再写 `Vue.use(Vuex)`，否则控制台出现 "already installed"。
4. **Pinia 的引入顺序**：`vue.js` → `vue-demi.js` → `pinia.js`，少一个 vue-demi 就直接报错。
5. **Pinia 的 storeToRefs**：从 store 里解构 state 要用 `Pinia.storeToRefs(store)` 包一层，直接 `const { count } = store` 会**丢失响应式**。
6. **`defineStore` 的第一个参数（id）必须全局唯一**，两个 store 用同一个 id 会互相干扰。
