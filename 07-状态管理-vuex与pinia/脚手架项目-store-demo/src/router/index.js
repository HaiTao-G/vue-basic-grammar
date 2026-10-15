import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  { path: "/", redirect: "/vuex" },
  {
    path: "/vuex",
    name: "vuex",
    component: () => import("@/views/VuexDemo"),
    meta: { title: "Vuex 篇" },
  },
  {
    path: "/pinia",
    name: "pinia",
    component: () => import("@/views/PiniaDemo"),
    meta: { title: "Pinia 篇" },
  },
  { path: "*", redirect: "/vuex" },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.afterEach((to) => {
  if (to.meta.title) document.title = to.meta.title;
});

export default router;
