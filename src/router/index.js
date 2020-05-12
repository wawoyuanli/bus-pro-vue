import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//引入公共组件
import Layout from "../views/back/Layout/Index.vue"
 

//路由的定义
const routes = [
  //第一次进入登录页
  {
   path: '/',
   hidden:true,
   meta:{
     name:'主页'
   }
  },
  //登录
  {
    path: '/login',
    name: 'Login',
    hidden:true,
    meta:{
    name:'登录'
    },
    component: () => import( '../views/Login.vue')
  },
  //首页
  {
    path: '/front',
    name: 'Front',
    hidden:true,
    meta:{
      name:'前端首页'
    },
    component: () => import( '../views/front/Main.vue')
  },
  //新闻动态
  {
    path: '/front/new',
    name: 'New',
    hidden:true,
    meta:{
    name:'新闻动态'
    },
    component: () => import( '../views/front/New.vue')
  },
  {
    path: '/front/newDetail',
    name: 'NewDetail',
    hidden:true,
    meta:{
    name:'新闻公告详情'
    },
    component: () => import( '../views/front/NewDetail.vue')
  },
  //公交查询
  {
    path: '/front/busSearch',
    name: 'BusSearch',
    hidden:true,
    meta:{
    name:'公安查询'
    },
    component: () => import( '../views/front/BusSearch.vue')
  },
  //公交文化
    {
      path: '/front/busCulture',
      name: 'BusCulture',
      hidden:true,
      meta:{
        name:'公交文化'
            },
      component: () => import( '../views/front/BusCulture.vue')
     
      
    },
    {
      path: '/front/workDetail',
      name: 'WorkDetail',
      hidden:true,
      meta:{
        name:'工作详情'
            },
      component: () => import( '../views/front/WorkDetail.vue')   
    },
    //留言板
    {
      path: '/front/message',
      name: 'Message',
      hidden:true,
      meta:{
        name:'公安查询'
            },
      component: () => import( '../views/front/Message.vue')
      
    },
    {
      path: '/front/workShow',
      name: 'WorkShow',
      hidden:true,
      meta:{
        name:'公安查询'
            },
      component: () => import( '../views/front/WorkShow.vue')
    },
    {
      path: '/front/forum',
      name: 'Forum',
      hidden:true,
      meta:{
        name:'论坛'
            },
      component: () => import( '../views/front/Forum.vue')
    },
    //后台
    {
      path: "/console",
      name: "Console",
      // redirect: "index",
      meta:{
      name:'控制台',
      icon:'console',
      },
      component:Layout,
      children: [
        {
          path: "/index",
          name: "Index",
          meta: {
            name: "首页",
          },
          component: () => import("../views/back/Console.vue")
        }
      ]
    },
    //线路管理
    {
      path: "/line",
      name: "Line",
      meta:{
      name:'线路管理',
      icon:'line',
      },
      component:Layout,
      children: [
        {
          path: "/lineMaintain",
          name: "LineMaintain",
          meta: {
            name: "线路维护",
       
          },
          component: () => import("../views/back/Line.vue")
        },
        // {
        //   path: "/stationMaintain",
        //   name: "StationMaintain",
        //   meta: {
        //     name: "站点维护",
           
        //   },
        //   component: () => import("../views/back/Station.vue")
        // },
        {
          path: "/bus",
          name: "Bus",
          meta: {
            name: "站点维护",
           
          },
          component: () => import("../views/back/Bus.vue")
        },
        {
          path: "/change",
          name: "Change",
          meta: {
            name: "换乘查询",
           
          },
          component: () => import("../views/back/Change.vue")
        }
    
      ]
    },
    //新闻公告管理
    {
      path: "/news",
      name: "News",
      meta:{
      name:'新闻公告管理',
      icon:'news',
      },
      component:Layout,
      children: [
        {
          path: "/newsManage",
          name: "NewsManage",
          meta: {
            name: "新闻公告管理",
        
          },
          component: () => import("../views/back/News.vue")
        }
      ]
    },
    //公交文化管理
    {
      path: "/culture",
      name: "Culture",
      meta:{
      name:'公交文化管理',
      icon:'culture'
      },
      component:Layout,
      children: [
        {
          path: "/cultureManage",
          name: "CultureManage",
          meta: {
            name: "员工风采栏",
        
          },
          component: () => import("../views/back/Culture.vue")
        }
      ]
    },
    //留言管理
    {
      path: "/messageIndex",
      name: "MessageIndex",
      meta:{
      name:'留言管理',
      icon:'message'
      },
      component:Layout,
      children: [
        {
          path: "/messageManage",
          name: "MessageManage",
          meta: {
            name: "留言管理",
          
          },
          component: () => import("../views/back/Message.vue")
        }
      ]
    },
     //新闻公告管理
     {
      path: "/users",
      name: "Users",
      meta:{
      name:'用户管理',
      icon:'user',
      },
      component:Layout,
      children: [
        {
          path: "/userManage",
          name: "UserManage",
          meta: {
            name: "用户管理",
        
          },
          component: () => import("../views/back/User.vue")
        }
      ]
    },
  ]
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
