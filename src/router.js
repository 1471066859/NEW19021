import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/PC/Login'


// 移动客户端
import client from '@/views/Mob/client/Home'
import m_login from '@/views/Mob/Login'
import add_order from '@/views/Mob/client/AddOrder'
import m_register from '@/views/Mob/Register'
import my_order from '@/views/Mob/client/MyOrder'
import order_detal from '@/views/Mob/client/OrderDetal'

Vue.use(Router)
const router = new Router({
  mode: 'hash',
  routes: [{
      path: '/',
      redirect: '/page'
    },
    {
      // 测试代码
      path: "/test",
      component: () => import('@/views/test')
    },
    {
      path: '/page',
      component: () => import('@/views/PC/Page'),
      redirect: '/page/AllOrder',
      children: [
        // {
        //   path: '/page/BoxAdmin',
        //   component: () => import('@/views/PC/depot/BoxAdmin')
        // },
        {
          path: "/page/StuffChart",
          component: () => import('@/views/PC/report/StuffChart.vue')
        },
        {
          path: "/page/StuffReportR",
          component: () => import('@/views/PC/report/StuffReportR.vue')
        },
        {
          path: "/page/StuffReportZ",
          component: () => import('@/views/PC/report/StuffReportZ.vue')
        },
        {
          path: "/page/StuffReportY",
          component: () => import('@/views/PC/report/StuffReportY.vue')
        },
        {
          path: "/page/StuffReportJ",
          component: () => import('@/views/PC/report/StuffReportJ.vue')
        },
        {
          path: "/page/StuffReportN",
          component: () => import('@/views/PC/report/StuffReportN.vue')
        },
        {
          path: "/page/ProReportR",
          component: () => import('@/views/PC/report/ProReportR.vue')
        },
        {
          path: "/page/ProReportZ",
          component: () => import('@/views/PC/report/ProReportZ.vue')
        },
        {
          path: "/page/ProReportY",
          component: () => import('@/views/PC/report/ProReportY.vue')
        },
        {
          path: "/page/ProReportJ",
          component: () => import('@/views/PC/report/ProReportJ.vue')
        },
        {
          path: "/page/ProReportN",
          component: () => import('@/views/PC/report/ProReportN.vue')
        },
        {
          path: "/page/Chart",
          component: () => import('@/views/PC/report/Chart.vue')
        },
        {
          path: "/page/Materials",
          component: () => import('@/views/PC/depot/Materials')
        },
        {
          path: "/page/ProductAdmin",
          component: () => import('@/views/PC/depot/ProductAdmin')
        },
        {
          path: "/page/ProAdmin",
          component: () => import('@/views/PC/proAdmin/')
        },
        {
          path: "/page/AllOrder",
          component: () => import('@/views/PC/orderAdmin/AllOrder')
        },
        {
          path: "/page/ProingOrder",
          component: () => import('@/views/PC/orderAdmin/ProingOrder')
        },
        {
          path: "/page/CarryOrder",
          component: () => import('@/views/PC/orderAdmin/CarryOrder')
        },
        {
          path: "/page/AwatOrder",
          component: () => import('@/views/PC/orderAdmin/AwatOrder')
        },
        {
          path: "/page/ErrorOrder",
          component: () => import('@/views/PC/orderAdmin/ErrorOrder')
        },
        {
          path: "/page/UserInfo",
          component: () => import('@/views/PC/userInfo/Index')
        },
        {
          path: "/page/OrderQuality",
          component: () => import('@/views/PC/qualityAdmin/OrderQuality')
        },
        {
          path: "/page/StuffQuality",
          component: () => import('@/views/PC/qualityAdmin/StuffQuality')
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/mregister',
      component: m_register
    },
    {
      path: "/mlogin",
      component: m_login
    },
    {
      path: '/works',
      redirect: '/works/production',
      component: () => import('@/views/Mob/works/Works'),
      children: [{
          path: '/works/production',
          component: () => import('@/views/Mob/works/Production'),
          // 保存订单管理页面状态
          // meta: {
          //   keepAlive: false
          // }
        },
        {
          path: '/works/OrderAdmin',
          component: () => import('@/views/Mob/works/OrderAdmin'),
          // meta: {
          //   keepAlive: true
          // }
        },
        {
          path: '/works/UnitAdmin',
          component: () => import('@/views/Mob/works/UnitAdmin'),
          // meta: {
          //   keepAlive: false
          // }
        },
        {
          path: '/works/About',
          component: () => import('@/views/Mob/works/About'),
          // meta: {
          //   keepAlive: false
          // }
        },
        {
          path: '/works/OrderDetal',
          component: () => import('@/views/Mob/works/OrderDetal')
        },
      ]
    },
    {
      path: '/client',
      redirect: '/client/add_order',
      component: client,
      children: [{
          path: "/client/add_order",
          component: add_order
        },
        {
          path: '/client/my_order',
          component: my_order
        },
        {
          path: '/client/order_detal',
          component: order_detal
        }
      ]
    }
  ]
})

export default router