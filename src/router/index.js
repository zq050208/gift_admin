import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const router = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/home/index'), // 路由懒加载
    meta: {
      title: '首页', // 页面标题
      keepAlive: false // keep-alive 标识
    }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/home/about'),
    meta: {
      title: '关于我',
      keepAlive: false
    }
  },
  {
    path: '/giftinfo/:id',
    name: 'giftinfo',
    component: () => import('@/views/home/giftinfo'),
    meta: {
      title: '普通礼包详情',
      keepAlive: false
    }
  },
  {
    path: '/g/:id',
    name: 'giftinfo',
    component: () => import('@/views/home/giftinfo'),
    meta: {
      title: '普通礼包详情',
      keepAlive: false
    }
  },
  {
    path: '/bookinggift/:id',
    name: 'bookinggift',
    component: () => import('@/views/home/bookinggift'),
    meta: {
      title: '预约礼包',
      keepAlive: false
    }
  },
  {
    path: '/mygift',
    name: 'mygift',
    component: () => import('@/views/home/mygift'),
    meta: {
      title: '我的礼包',
      keepAlive: false
    }
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/home/search'),
    meta: {
      title: '搜索页',
      keepAlive: false
    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({y: 0}),
    routes: router
  })

export default createRouter()
