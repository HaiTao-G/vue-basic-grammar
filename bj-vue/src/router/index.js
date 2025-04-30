import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login.vue";
import AppIndex from "@/components/AppIndex.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes:[
        {
            name: "Login",
            path: "/login",
            component: Login,
        },
        {
            name: "AppIndex",
            path: "/index",
            component: AppIndex,
            meta:{
                requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
            }
        }
    ]
});