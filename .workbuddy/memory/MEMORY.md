# 项目长期笔记 — vue-basic-grammar

## 项目性质

Vue 2 基础语法练习集，按章节编号组织，用于学习/复习 Vue 2 知识。

## 目录规范

- 命名：`NN-主题名`，中文主题名，编号连续（如 `01-创建vue实列`、`05-vue路由`、`06-父子组件传值`、`07-状态管理-vuex与pinia`）。
- 每个学习文件夹内：`README.md`（学习索引 + 概念速查 + 易错点）+ 编号 HTML 示例，由浅入深。
- 例外：`08-智慧商城项目` 是 vue-cli 工程（Vue 2.6.14 + vant + vue-router 3.5.1，含 node_modules），不是单文件示例。

## 编写约定

- **纯 HTML 单文件 + 本地引入**，不用构建工具：`<script src="../js/vue.js">`，双击即可运行。
- 全局用 kebab-case 写组件名/自定义事件名（DOM 模板大小写不敏感）；props 定义驼峰、模板传值连字符。
- 中文注释详尽，页面配浅色卡片样式 + 可交互演示 + 概念对照表。
- 每个示例文件结构：概念说明区 → 可交互演示区 → 知识点/对比表区。

## js/ 目录本地依赖

| 文件 | 版本 | 说明 |
| --- | --- | --- |
| vue.js / vue.min.js | 2.7.16 | 所有示例的基础 |
| vue-router.js | 3.6.5 | 05 章用；hash 模式，双击可运行 |
| vuex.js | 3.6.2 | 07 章用；UMD 检测到全局 Vue 会**自动安装**，不要再手动 Vue.use |
| vue-demi.js | 0.14.6 | Pinia 桥接层，文件在 `lib/index.iife.js` |
| pinia.js | 2.1.7 | 07 章用；`dist/pinia.iife.js`；引入顺序必须是 vue → vue-demi → pinia，且需手动 `Vue.use(Pinia.PiniaVuePlugin)` |

## 验证习惯（重要）

写完示例后做两步验证：
1. Node 提取 `<script>` 内容做语法检查（`new Function(code)`）。
2. Chrome headless 渲染验证：`chrome.exe --headless=new --dump-dom --virtual-time-budget=4000 <file:///url>`。
   **注意**：dump 出的 HTML 含 `<script>` 源码，必须先剥掉 script/style 再检查文本，否则会误判（源码里的模板字符串会被 grep 到）。

## 已知坑点（教学重点，已在示例中标注）

- `vue-router` 3 的 `to.meta` 不继承父级 meta，嵌套路由下判断权限要用 `to.matched.some(r => r.meta.requiresAuth)`。
- 守卫首次导航时 Vue 根实例尚未挂载完，守卫中访问 `app.xxx` 要判空。
- Pinia 从 store 解构 state/getters 必须用 `storeToRefs`，否则丢响应式。
- `v-slot` 只能写在 `<template>` 上（独占默认插槽除外），且插槽内容处于父级编译作用域中。
- 自定义指令操作真实 DOM（如 `focus()`）必须在 `inserted` 钩子而非 `bind` 钩子中执行；全局监听必须在 `unbind` 中清理。
- Mixin 的生命周期钩子先于组件自身执行且都会执行；data/methods 冲突时组件自身优先级更高。
- 生命周期函数中操作 DOM 必须在 `mounted`（在 `created` 中操作真实 DOM 会是 null）；修改数据后想获取最新 DOM 必须使用 `$nextTick`。
- 子组件挂载完成先于父组件挂载（先子后父挂载），因此父组件 `mounted` 时所有子组件必定已挂载就绪。
- 定时器 `setInterval` 与 `window` 监听器必须在 `beforeDestroy` 中销毁注销，否则会产生隐蔽的内存泄漏。
