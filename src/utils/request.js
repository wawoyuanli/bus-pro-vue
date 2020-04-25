//拦截器的定义
import axios from 'axios'
import {Message} from "element-ui"
import {getToKen,getUserName} from '../utils/app.js'
const BASEURL= process.env.NODE_ENV === 'production' ? '' : '/devApi';

//创建 axios
const service=axios.create({
    baseURL:BASEURL,
    timeout:15000
});

//请求拦截器
axios.interceptors.request.use(function(config){
    config.headers['token']=getToKen()
    config.headers['username']=getUserName()
    return config;
},function(error){
    return Promise.reject(error);
})

//响应拦截器
axios.interceptors.response.use(function(response){
    return response;
},function(error){
    return Promise.reject(error);
})


export default service