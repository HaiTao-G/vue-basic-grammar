# 脚手架版：components-demo（父子组件传值 · 工程化练习）

这是 `06-父子组件传值` 的工程化版本。HTML 版让你理解概念，这个项目让你看到
真实项目里组件是怎么**拆分文件、局部注册、层层传值**的。

## 怎么跑起来

```bash
cd 脚手架项目-components-demo
npm install      # 第一次需要装依赖
npm run serve    # 访问 http://localhost:5174
```

## HTML 版 → 脚手架版 对照

| HTML 单文件 | 本项目位置 |
| --- | --- |
| 01 父传子 props | `src/components/ProductList.vue`、父 `src/App.vue` |
| 02 子传父 $emit | `src/components/ProductItem.vue`、`CartPanel.vue` |
| 03 props 校验与默认值 | `ProductItem.vue` 的 `validator`、`CartPanel.vue` 的 `default` |
| 04 .sync 与 v-model | `src/components/CounterBox.vue`、`BaseInput.vue` |
| 05 $refs / $parent | `src/components/ChildCard.vue` + App 里的两个按钮 |
| 06 综合练习购物车 | App + ProductList + ProductItem + CartPanel 完整链路 |

## 目录结构

```
脚手架项目-components-demo/
├── src/
│   ├── main.js                    # 入口（本练习不用路由）
│   ├── App.vue                    # ★ 唯一的"数据持有者"，所有事件都汇总到这里
│   └── components/
│       ├── ProductList.vue        # 中间层：接收 list，向下传、向上转发
│       ├── ProductItem.vue        # props 完整校验 + $emit('add-to-cart', item)
│       ├── CartPanel.vue          # 抛 remove / change-count / clear 三个事件
│       ├── BaseInput.vue          # 组件 v-model（value + input）
│       ├── CounterBox.vue         # .sync（count + update:count）
│       └── ChildCard.vue          # $refs 演示 + 不带参/带参事件
├── package.json
├── vue.config.js                  # 端口 5174
└── babel.config.js
```

## 脚手架版和 HTML 版最大的 3 个区别

1. **组件名可以写 PascalCase**
   HTML 单文件里必须写 `<product-item>`（浏览器把标签名统一转小写，写
   `<ProductItem>` 会失效）；脚手架里 `.vue` 文件经过编译，大小写保留，
   所以能写 `<ProductItem>`，这也是真实项目的主流写法。

2. **组件拆成独立文件 + `components` 局部注册**
   不再用 `Vue.component()` 全局注册。谁用谁引入，依赖关系一目了然。

3. **`@/` 路径别名**：`import X from "@/components/X"` 等价于
   `src/components/X`。

## 数据流一图流

```
        ┌──────────────── App.vue（数据在这里）────────────────┐
        │                                                      │
   props:list                                            props:cart / :total
        ↓                                                      ↓
  ProductList ──props:item──> ProductItem              CartPanel
        ↑                          │                          │
        └──── $emit('add-to-cart') ┘                          │
        ↑                                                     │
        └──────── $emit('remove' / 'change-count' / 'clear') ──┘
```

**永远记住**：子组件想改数据 → 不要自己改 props → `$emit` 告诉父组件 →
父组件改自己的 data → props 自动更新 → 子组件重新渲染。

## 建议动手改一下

- 在 `ProductItem.vue` 里加一行 `this.item.name = "改名了"`，看控制台的警告
  （props 只读，单向数据流）。
- 把 `App.vue` 里 `<BaseInput v-model="keyword">` 改成拆开的写法
  `:value="keyword" @input="keyword = $event"`，确认效果完全一样。
- 把 `<CounterBox :count.sync="num">` 改成 `:count="num" @update:count="num = $event"`，
  同样验证 `.sync` 只是语法糖。

> 提示：Vue 3 里 `.sync` 已被移除，统一用 `v-model:count="num"`；
> 组件 v-model 的默认 prop 也从 `value/input` 改成了 `modelValue/update:modelValue`。
