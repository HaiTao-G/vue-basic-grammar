import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login.vue";
import AppIndex from "@/components/AppIndex.vue";
import Home from "@/components/Home.vue";
import LibraryIndex from "@/components/library/LibraryIndex.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "Login",
      path: "/login",
      component: Login,
    },
    {
      path: "/home",
      name: "Home",
      // home页面并不需要被访问
      component: Home,
      redirect: "/index",
      children: [
        {
          name: "AppIndex",
          path: "/index",
          component: AppIndex,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          },
        },
        {
          name: "Library",
          path: "/library",
          component:LibraryIndex,
          meta: {
            requireAuth: true, // 添加该字段，表示进入这个路由是需要登录的
          },
        }
      ],
    },
  ],
});
