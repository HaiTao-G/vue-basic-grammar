# 脚手架版：router-demo（Vue Router 工程化练习）

这是 `05-vue路由` 的**工程化版本**。上面的 HTML 文件帮你理解概念，这个项目让你体验
真实项目里路由是怎么组织的。

## 怎么跑起来

```bash
cd 脚手架项目-router-demo
npm install      # 第一次跑需要装依赖（几百 MB，稍等几分钟）
npm run serve    # 启动后访问 http://localhost:5173
```

> 依赖装完后，`npm install` 不用再跑第二次；之后每次学习直接 `npm run serve` 即可。

## HTML 版 → 脚手架版 对照

| HTML 单文件 | 本项目的位置 |
| --- | --- |
| 01 基本使用 | `src/router/index.js` + `src/App.vue` |
| 02 声明式/编程式导航 | `src/App.vue` 的顶栏 + 按钮区 |
| 03 路由传参 | `src/views/GoodsList.vue`（query）、`GoodsDetail.vue`（params） |
| 04 动态路由/重定向/别名/404 | `src/router/index.js` 第 4、5、6、10 段 |
| 05 嵌套路由 | `src/views/user/` 整个目录 |
| 06 路由守卫 | `src/router/index.js` 的 `beforeEach` / `afterEach` |
| 07 综合练习 | 登录 + 订单 + 个人中心的完整拦截链路 |

## 目录结构

```
脚手架项目-router-demo/
├── public/index.html          # 页面模板（脚手架自动注入 js）
├── src/
│   ├── main.js                # 入口：创建 Vue 实例并注入 router
│   ├── App.vue                # 根组件：导航栏 + 路由信息面板 + router-view
│   ├── router/index.js        # ★ 路由表 + 全局守卫（整个项目的核心）
│   └── views/
│       ├── Home.vue  About.vue  Login.vue  NotFound.vue
│       ├── GoodsList.vue      # query 传参 + 列表过滤
│       ├── GoodsDetail.vue    # params 传参 + props 解耦 + 组件复用
│       ├── Order.vue          # 需登录（meta.requiresAuth）
│       └── user/              # 嵌套路由：父 UserLayout + 三个子页面
├── package.json
├── vue.config.js              # 端口 5173，关闭 eslint
└── babel.config.js
```

## 一定要动手试的 6 件事

1. **未登录访问 `/order`** → 被守卫弹到 `/login?redirect=/order`，登录后自动回到订单页。
2. **地址栏输入 `/old-goods/3`** → 自动重定向到 `/goods/3`（重定向带参数的写法）。
3. **地址栏输入 `/shop`** → 地址不变，但渲染的是首页（别名 alias）。
4. **在「关于」页输入框里打字后点别的导航** → 触发 `beforeRouteLeave` 拦截确认。
5. **在商品详情页点「看下一个商品」** → 组件被复用，只有 `watch: { id }` 和
   `beforeRouteUpdate` 会触发，`created` 不会（看控制台）。
6. **访问 `/some-wrong-path`** → 落到 404 页（通配符路由必须在最后）。

## 脚手架版独有的 3 个新知识点

HTML 单文件里做不到，只有工程化项目才有：

1. **路由懒加载**：`component: () => import("@/views/About")`
   页面会被切成独立 js，第一次访问才下载，首屏更快。
2. **history 模式**：地址栏没有 `#`，更像真实网站
   （注意：部署到服务器需要后端配合，否则刷新会 404）。
3. **`@` 别名**：`@/views/Home` 等价于 `src/views/Home`，是脚手架内置的路径别名。
