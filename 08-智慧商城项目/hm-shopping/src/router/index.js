import Vue from "vue";
import VueRouter from "vue-router";
import Layout from "@/views/Layout";
import Search from "@/views/Search";
import SearchList from "@/views/SearchList";
import ProDetail from "@/views/ProDetail";
import Login from "@/views/Login";
import Pay from "@/views/Pay";
import MyOrder from "@/views/MyOrder";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    {
      path: "/login",
      component: Login,
    },
    {
      path: "/",
      component: Layout,
    },
    {
      path: "/search",
      component: Search,
    },
    {
      path: "/searchlist",
      component: SearchList,
    },
    {
      path: "/prodetail/:id",
      component: ProDetail,
    },
    {
      path: "/pay",
      component: Pay,
    },
    {
      path: "/myorder",
      component: MyOrder,
    },
  ],
});

export default router;
