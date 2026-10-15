# 脚手架版：store-demo（Vuex & Pinia 工程化练习）

这是 `07-状态管理-vuex与pinia` 的工程化版本。Vuex 和 Pinia **同时挂在同一个 Vue
实例上**，可以随时切换对比。

## 怎么跑起来

```bash
cd 脚手架项目-store-demo
npm install      # 第一次需要装依赖
npm run serve    # 访问 http://localhost:5175
```

## HTML 版 → 脚手架版 对照

| HTML 单文件 | 本项目位置 |
| --- | --- |
| 01 Vuex state/getters | `src/store/index.js`（store 部分）+ `src/views/VuexDemo.vue` |
| 02 Vuex mutations/actions | `src/store/modules/cart.js`、`user.js` |
| 03 Vuex 辅助函数与模块 | `src/components/GoodsList.vue`、`CartInfo.vue`（`createNamespacedHelpers`） |
| 04 Pinia state/getters | `src/stores/counter.js` + `src/components/CounterCard.vue` |
| 05 Pinia actions/异步 | `src/stores/todo.js` + `src/components/TodoCard.vue` |
| 06 对比与选型 | `/vuex` 和 `/pinia` 两个页面切换着看 |

## 目录结构

```
脚手架项目-store-demo/
├── src/
│   ├── main.js                    # ★ 同时注入 Vuex store 和 Pinia
│   ├── App.vue                    # 顶栏 + 路由出口
│   ├── router/index.js            # /vuex 和 /pinia 两个页面
│   ├── store/                     # ===== Vuex =====
│   │   ├── index.js               # 根 store（含 strict 模式）
│   │   └── modules/
│   │       ├── cart.js            # 购物车模块（namespaced）
│   │       └── user.js            # 用户模块（异步登录 action）
│   ├── stores/                    # ===== Pinia =====
│   │   ├── counter.js
│   │   └── todo.js
│   ├── views/
│   │   ├── VuexDemo.vue           # 兄弟组件通信 + login + strict 演示
│   │   └── PiniaDemo.vue          # $subscribe 订阅日志
│   └── components/
│       ├── GoodsList.vue          # Vuex：dispatch 加购
│       ├── CartInfo.vue           # Vuex：读 store 展示购物车
│       ├── CounterCard.vue        # Pinia：storeToRefs 的正确用法
│       └── TodoCard.vue           # Pinia：异步 action + 筛选
├── package.json
├── vue.config.js                  # 端口 5175
└── babel.config.js
```

## 脚手架版新增的 4 个关键点

1. **`Vue.use(Vuex)` 在这里必须写**
   HTML 版引入的 CDN（UMD）版本会自动安装，写了反而报 "already installed"；
   而 npm + `import` 的方式**必须手动 `Vue.use(Vuex)`**。同一个库，两种引入方式行为不同。

2. **Pinia 在 Vue 2 下要装插件**
   ```js
   import { createPinia, PiniaVuePlugin } from "pinia";
   Vue.use(PiniaVuePlugin);        // 少了这行，组件里拿不到 store
   const pinia = createPinia();
   new Vue({ store, pinia, router, render: (h) => h(App) });
   ```
   （Vue 3 里不需要 `PiniaVuePlugin`，直接 `app.use(createPinia())`。）

3. **store 按模块拆文件**
   不再是全部塞进一个 `new Vuex.Store()`。真实项目里购物车、用户、订单各一个文件，
   用 `namespaced: true` 隔离，配合 `createNamespacedHelpers` 使用。

4. **`strict: process.env.NODE_ENV !== "production"`**
   开发时开启，任何绕过 mutation 直接改 state 的操作都会报错（页面上有按钮可以试）。
   上线自动关闭，因为深度监听有性能开销。

## 两相对照表（写在同一页方便记）

| 事情 | Vuex 3 | Pinia 2 |
| --- | --- | --- |
| 定义 | `new Vuex.Store({ state, getters, mutations, actions })` | `defineStore("id", { state, getters, actions })` |
| 读数据 | `this.$store.state.x` / `mapState` | `store.x` 直接用 |
| 改数据（同步） | `commit("XXX")` → mutation | action 里直接 `this.x++` |
| 改数据（异步） | `dispatch("xxx")` → action → commit | action 里 `await` 后直接改 |
| 批量改 | 只能一个个 commit | `store.$patch({ ... })` 或 `$patch(fn)` |
| 重置 | 手写 mutation | `store.$reset()` |
| 模块 | `modules` + `namespaced` | 天然多 store，无需嵌套 |
| 解构 | `mapState` | **`storeToRefs`**（不然丢响应式） |

## 建议动手试

- 在 `CartInfo.vue` 里点加减，注意 `GoodsList.vue` 完全不用配合。
- 把 `CounterCard.vue` 里的 `storeToRefs` 换成直接解构，看数字是否还能变。
- 在 Vuex 页点「绕过 mutation 直接改 state」，看 strict 模式怎么报错。
- 在 Pinia 页点几个按钮，观察 `$subscribe` 自动打印的日志。
