import router from "@/router";
import axios from "axios";

//创建axios实例
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, //请求的基础URL
    timeout: 5000, //请求超时时间
});

//请求拦截器
service.interceptors.request.use(
    config => {
        //在请求发送之前做一些处理
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = token; //将token放到请求头发送给服务器
        }
        return config;
    },
    error => {
        //对请求错误做些处理
        return Promise.reject(error);
    }
);

//响应拦截器
service.interceptors.response.use(
    response=>{
        //对响应数据做些处理
        return response.data;
    },
    error => {
        //对响应错误做些处理
        console.log("err" + error); //打印错误信息
        if (error.response) {
            //根据不同的状态码进行不同的处理
            switch (error.response.status) {
                case 401:
                    //未授权，跳转到登录页面
                    router.push("/login");
                    break;
                case 403:
                    //禁止访问，提示用户
                    alert("没有权限访问该资源");
                    break;
                case 404:
                    //未找到，提示用户
                    alert("请求的资源未找到");
                    break;
                default:
                    alert("请求失败，请稍后重试");
            }
        } else if (error.request) {
            //请求已发出，但没有响应
            alert("请求超时，请检查网络连接");
        } else{
            //其他错误
            alert("请求失败，请稍后重试");
        }
        return Promise.reject(error);
    }
);

export default service;