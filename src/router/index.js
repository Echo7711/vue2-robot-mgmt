import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/index',
    name: 'Index',
    component: () => import('../views/Index.vue'),
    redirect: '/analysis',
    children: [
      {
        path: '/analysis',
        name: 'Analysis',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '数据分析']
        },
        component: () => import('../views/analysis/Index.vue')
      },
      {
        path: '/task',
        name: 'Task',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '任务管理']
        },
        component: () => import('../views/task/Index.vue')
      },
      {
        path: '/notification',
        name: 'notification',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '消息通知']
        },
        component: () => import('../views/notification/Index.vue')
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '账号管理']
        },
        component: () => import('../views/user/Index.vue')
      },
      {
        path: '/robot',
        name: 'Robot',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '机器人']
        },
        component: () => import('../views/robot/Index.vue')
      },
      {
        path: '/department',
        name: 'Department',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '科室']
        },
        component: () => import('../views/department/Index.vue')
      },
      {
        path: '/parkpoint',
        name: 'ParkPoint',
        meta: {
          keepalive: true,
          breadcrumb: ['首页', '停泊点']
        },
        component: () => import('../views/point/Index.vue')
      },
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
