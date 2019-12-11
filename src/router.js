import Vue from 'vue'
import Router from 'vue-router'
// PC登录
import Login from '@/views/PC/Login'
// 移动端登录
import m_login from '@/views/Mob/Login'
// 移动端注册
import m_register from '@/views/Mob/Register'

// 客户端
// 路由容器
import client from '@/views/Mob/client/Home'
// 下单页面
import add_order from '@/views/Mob/client/AddOrder'
// 我的订单
import my_order from '@/views/Mob/client/MyOrder'
// 订单详情
import order_detal from '@/views/Mob/client/OrderDetal'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/page'
    },
    // pc路由容器
    {
      path: '/page',
      component: () => import('@/views/PC/Page'),
      redirect: '/page/AllOrder',
      children: [{
          //原材料报表总览
          path: "/page/StuffChart",
          component: () => import('@/views/PC/report/StuffChart.vue')
        },
        // 原材料日报表
        {
          path: "/page/StuffReportR",
          component: () => import('@/views/PC/report/StuffReportR.vue')
        },
        // 原材料周报表
        {
          path: "/page/StuffReportZ",
          component: () => import('@/views/PC/report/StuffReportZ.vue')
        },
        // 原材料月报表
        {
          path: "/page/StuffReportY",
          component: () => import('@/views/PC/report/StuffReportY.vue')
        },
        // 原材料季报表
        {
          path: "/page/StuffReportJ",
          component: () => import('@/views/PC/report/StuffReportJ.vue')
        },
        // 原材料年报表
        {
          path: "/page/StuffReportN",
          component: () => import('@/views/PC/report/StuffReportN.vue')
        },
        // 生产日报表
        {
          path: "/page/ProReportR",
          component: () => import('@/views/PC/report/ProReportR.vue')
        },
        // 生产周报表
        {
          path: "/page/ProReportZ",
          component: () => import('@/views/PC/report/ProReportZ.vue')
        },
        // 生产月报表
        {
          path: "/page/ProReportY",
          component: () => import('@/views/PC/report/ProReportY.vue')
        },
        // 生产季报表
        {
          path: "/page/ProReportJ",
          component: () => import('@/views/PC/report/ProReportJ.vue')
        },
        // 生产年报表
        {
          path: "/page/ProReportN",
          component: () => import('@/views/PC/report/ProReportN.vue')
        },
        // 生产报表总览
        {
          path: "/page/Chart",
          component: () => import('@/views/PC/report/Chart.vue')
        },
        // 物料出入库
        {
          path: "/page/Materials",
          component: () => import('@/views/PC/depot/Materials')
        },
        // 成品出入库
        {
          path: "/page/ProductAdmin",
          component: () => import('@/views/PC/depot/ProductAdmin')
        },
        // 产线管理
        {
          path: "/page/ProAdmin",
          component: () => import('@/views/PC/proAdmin/')
        },
        // 全部订单
        {
          path: "/page/AllOrder",
          component: () => import('@/views/PC/orderAdmin/AllOrder')
        },
        // 已完成订单
        {
          path: "/page/ProingOrder",
          component: () => import('@/views/PC/orderAdmin/ProingOrder')
        },
        // 正在生产订单
        {
          path: "/page/CarryOrder",
          component: () => import('@/views/PC/orderAdmin/CarryOrder')
        },
        // 待生产订单
        {
          path: "/page/AwatOrder",
          component: () => import('@/views/PC/orderAdmin/AwatOrder')
        },
        // 异常订单
        {
          path: "/page/ErrorOrder",
          component: () => import('@/views/PC/orderAdmin/ErrorOrder')
        },
        // 后台管理
        {
          path: "/page/UserInfo",
          component: () => import('@/views/PC/userInfo/Index')
        },
        // 成品质量管理
        {
          path: "/page/OrderQuality",
          component: () => import('@/views/PC/qualityAdmin/OrderQuality')
        },
        // 原材料成品管理
        {
          path: "/page/StuffQuality",
          component: () => import('@/views/PC/qualityAdmin/StuffQuality')
        }
      ]
    },
    {
      // PC登录
      path: '/login',
      component: Login
    },
    {
      // 移动端注册
      path: '/mregister',
      component: m_register
    },
    {
      // 移动端登录
      path: "/mlogin",
      component: m_login
    },
    {
      // 工厂端路由容器
      path: '/works',
      redirect: '/works/production',
      component: () => import('@/views/Mob/works/Works'),
      children: [{
          // 产线管理
          path: '/works/production',
          component: () => import('@/views/Mob/works/Production'),
        },
        {
          // 订单管理
          path: '/works/OrderAdmin',
          component: () => import('@/views/Mob/works/OrderAdmin'),
        },
        {
          // 单元管理
          path: '/works/UnitAdmin',
          component: () => import('@/views/Mob/works/UnitAdmin'),
        },
        {
          // 我的信息
          path: '/works/About',
          component: () => import('@/views/Mob/works/About'),
        },
        {
          // 订单详情
          path: '/works/OrderDetal',
          component: () => import('@/views/Mob/works/OrderDetal')
        },
      ]
    },
    {
      // 客户端路由容器
      path: '/client',
      redirect: '/client/add_order',
      component: client,
      children: [{
          // 下单页面
          path: "/client/add_order",
          component: add_order
        },
        {
          // 我的订单
          path: '/client/my_order',
          component: my_order
        },
        {
          // 订单详情
          path: '/client/order_detal',
          component: order_detal
        }
      ]
    }
  ]
})

export default router