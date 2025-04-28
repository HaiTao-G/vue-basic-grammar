import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/Login.vue";
import AppIndex from "@/components/AppIndex.vue";

Vue.use(Router);

export default new Router({
    routes:[
        {
            name: "Login",
            path: "/login",
            component: Login,
        },
        {
            name: "AppIndex",
            path: "/index",
            component: AppIndex
        }
    ]
});