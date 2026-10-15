import Vue from "vue";
import VueRouter from "vue-router";

// 脚手架里用 import 引入组件，@ 是 src 目录的别名
import Home from "@/views/Home";
import Login from "@/views/Login";
import NotFound from "@/views/NotFound";

Vue.use(VueRouter);

const routes = [
  // ---------- 1. 重定向：访问根路径自动跳首页 ----------
  { path: "/", redirect: "/home" },

  // ---------- 2. 基础路由 + meta 元信息 ----------
  {
    path: "/home",
    name: "home",
    component: Home,
    // 别名：地址栏输入 /shop，渲染的仍然是 Home 组件，但路由名还是 home
    alias: "/shop",
    meta: { title: "首页", requiresAuth: false },
  },

  // ---------- 3. 路由懒加载（打包时单独切一个 chunk，首屏更快）----------
  // 写法：() => import("页面路径")，只有真正访问这个页面时才会去下载
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About"),
    meta: { title: "关于", requiresAuth: false },
  },

  // ---------- 4. 路由重定向（带参数）----------
  // 老地址 /old-goods/8 会被重定向到 /goods/8
  {
    path: "/old-goods/:id",
    redirect: (to) => {
      // to.params.id 就是老地址上的参数
      return { name: "goodsDetail", params: { id: to.params.id } };
    },
  },

  // ---------- 6. 动态路由 + props 解耦 ----------
  {
    path: "/goods/:id",
    name: "goodsDetail",
    component: () => import("@/views/GoodsDetail"),
    // 开启后，组件里可以直接 props: ["id"] 接收，不用写 this.$route.params.id
    // 好处：组件不再依赖 $route，更好复用、更好测试
    props: true,
    meta: { title: "商品详情", requiresAuth: false },
  },

  {
    path: "/goods",
    name: "goodsList",
    component: () => import("@/views/GoodsList"),
    meta: { title: "商品列表", requiresAuth: false },
  },

  // ---------- 7. 嵌套路由 children ----------
  // /user/1/profile、/user/1/posts、/user/1/settings
  // 注意子路由的 path 前面【不要】加 /，加了就变成根路径了
  {
    path: "/user/:id",
    component: () => import("@/views/user/UserLayout"),
    meta: { title: "个人中心", requiresAuth: true },
    children: [
      // 访问 /user/1 时，默认展示 profile
      { path: "", redirect: { name: "userProfile" } },
      {
        path: "profile",
        name: "userProfile",
        component: () => import("@/views/user/UserProfile"),
      },
      {
        path: "posts",
        name: "userPosts",
        component: () => import("@/views/user/UserPosts"),
      },
      {
        path: "settings",
        name: "userSettings",
        component: () => import("@/views/user/UserSettings"),
        meta: { title: "账号设置" },
      },
    ],
  },

  // ---------- 8. 需要登录的页面：meta.requiresAuth = true ----------
  {
    path: "/order",
    name: "order",
    component: () => import("@/views/Order"),
    meta: { title: "我的订单", requiresAuth: true },
  },

  // ---------- 9. 登录页（不需要登录就能看）----------
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: { title: "登录", requiresAuth: false },
  },

  // ---------- 10. 404 通配符：必须放【最后】----------
  // 它会匹配所有前面没匹配上的路径
  {
    path: "*",
    name: "notFound",
    component: NotFound,
    meta: { title: "页面走丢了" },
  },
];

const router = new VueRouter({
  mode: "history", // history 模式：地址栏没有 #，更像真实网站
  routes,
  // 页面切换后滚动到顶部（也可以 return { x, y } 精确控制）
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

/* =======================================================
 * 全局前置守卫：每次路由跳转前都会经过这里
 * to   即将进入的目标路由对象
 * from 正要离开的路由对象
 * next 放行函数，【必须调用】，否则页面会卡住不动
 * ======================================================= */
router.beforeEach((to, from, next) => {
  // ⚠️ 重点易错点：to.meta 只取【最深层】那条匹配记录的 meta
  // 比如 /user/1/settings，匹配链是 [user, settings]，to.meta 只有 settings 的
  // 所以判断"整条链上有没有要求登录"要用 to.matched.some(...)
  const needLogin = to.matched.some((record) => record.meta.requiresAuth);

  const token = localStorage.getItem("token");

  if (needLogin && !token) {
    // 没登录 -> 去登录页，并把"原本想去哪"通过 query 带过去
    // 登录后就能读 query.redirect 跳回原页面，体验更好
    next({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  } else if (to.path === "/login" && token) {
    // 已登录还去登录页 -> 直接送首页
    next("/home");
  } else {
    // 其它情况一律放行
    next();
  }
});

/* =======================================================
 * 全局后置钩子：跳转完成后触发，没有 next
 * 适合改标题、关 loading、埋点上报
 * ======================================================= */
router.afterEach((to) => {
  // 子路由没写 title 时，往上找父级的，保证标题不为空
  const title = to.matched.slice().reverse().find((r) => r.meta.title);
  if (title) document.title = title.meta.title;
});

export default router;
