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
      path: '/page',
      component: () => import('@/views/PC/Page'),
      redirect: '/page/BoxAdmin',
      children: [{
          path: '/page/BoxAdmin',
          component: () => import('@/views/PC/depot/BoxAdmin')
        },
        {
          path: "/page/Materials",
          component: () => import('@/views/PC/depot/Materials')
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