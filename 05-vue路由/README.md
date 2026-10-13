# 05 - Vue 路由（vue-router）

> 学习目标：搞懂「单页应用（SPA）为什么需要路由」，并熟练使用 vue-router 3.x 做页面切换、传参、嵌套和权限控制。

## 一、学习前提

| 项        | 说明                                                              |
| --------- | ----------------------------------------------------------------- |
| Vue 版本  | 2.7.16（本地 `../js/vue.js`，与 01~04 章节一致）                  |
| 路由版本  | vue-router 3.6.5（本地 `../js/vue-router.js`，已下载）            |
| 运行方式  | 双击 HTML 直接打开即可（使用 hash 模式 `#/xxx`，无需服务器）      |
| 对应工程  | `08-智慧商城项目` 用的是 vue-router@3.5.1，API 完全一致           |

## 二、文件清单（建议按顺序学）

| 文件                             | 内容                                             | 关键知识点                                     |
| -------------------------------- | ------------------------------------------------ | ---------------------------------------------- |
| `01-路由的基本使用.html`         | 第一个路由 demo：首页 / 关于页切换               | `routes`、`new VueRouter`、`router-link`、`router-view` |
| `02-声明式与编程式导航.html`     | 两种跳转方式的对比                               | `router-link`、`$router.push/replace/go`、`$route` vs `$router` |
| `03-路由传参.html`               | query 与 params 两种传参                         | `$route.query`、`$route.params`、`$route.fullPath` |
| `04-动态路由与重定向.html`       | 商品详情页 / 404 / 默认跳转                      | `:id`、`:id?`、`*`、`redirect`、`alias`、`$route.params` 变化监听 |
| `05-嵌套路由.html`               | 二级导航（我的 → 待付款/待收货）                 | `children`、二级 `router-view`、默认子路由    |
| `06-路由守卫.html`               | 登录拦截                                         | `beforeEach`、`to/from/next`、`meta`、`beforeEnter` |
| `07-综合练习-迷你后台.html`      | 侧边栏 + 内容区 + 登录守卫 + 详情页传参          | 综合运用以上全部                               |

## 三、核心概念速查

### 1. 前端路由是什么

传统多页应用：每次点击链接 → 向服务器请求一个新 HTML → 整页刷新。
单页应用（SPA）：只有**一个 HTML**，JS 监听 URL 变化 → 匹配到对应组件 → **只替换局部内容**，不刷新页面。

URL 变化有两种模式：

- **hash 模式**：`http://xxx/index.html#/home`，靠 `#` 后面变化，兼容性最好，无需后端配置（本目录全部使用）
- **history 模式**：`http://xxx/home`，需要后端把非静态请求都返回同一个 HTML

### 2. 使用路由的固定 5 步

```js
// 1. 定义路由组件（页面）
const Home = { template: `<div>首页</div>` };

// 2. 定义路由规则表
const routes = [{ path: "/home", component: Home }];

// 3. 创建 router 实例
const router = new VueRouter({ routes });

// 4. 挂载到 Vue 根实例（一个实例只能有一个 router）
new Vue({ el: "#app", router });

// 5. 页面上使用 <router-link> 跳转，<router-view> 渲染
```

### 3. 最容易搞混的一对概念

| 名字      | 是什么                        | 常用写法                        |
| --------- | ----------------------------- | ------------------------------- |
| `$route`  | **当前路由信息对象**（只读）  | `this.$route.path`、`this.$route.query` |
| `$router` | **路由实例**（管跳转的）      | `this.$router.push("/home")`    |

一句话记：**`$route` 是"我在哪"，`$router` 是"我要去哪"。**

## 四、易错点提醒

1. `router-link` 渲染出来是 `<a>` 标签，`to` 属性不是 `href`。
2. `params` 传参必须配合 `name` 使用，用 `path` 写会失效。
3. hash 模式下 `params` 刷新后会丢失，需要持久化的参数请用 `query`。
4. 组件复用时（如 `/user/1` → `/user/2`，组件相同）不会触发 `created`，要用 `watch: { '$route'(to, from) {} }` 监听。
5. 守卫里的 `next()` 必须调用，否则路由会一直挂起、页面卡住。
6. **嵌套路由下 `to.meta` 只包含"最深层"那条匹配记录的 meta，父级 meta 不会继承。**
   比如 `/goods` 上写了 `meta: { requiresAuth: true }`，访问子路由 `/goods/detail/2` 时
   `to.meta.requiresAuth` 是 `undefined`，守卫会直接失效。
   正确写法：`to.matched.some(record => record.meta.requiresAuth)`（见 07 文件）。
7. 守卫里第一次导航时，Vue 根实例可能还没挂载完，守卫中访问 `app.xxx` 记得判空。
