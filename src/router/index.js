import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Recommend',
    component: Recommend,
    meta: {
      num: true
    }
  },
  {
    path: '/toplist',
    name: 'Toplist',
    component: () => import('../views/Toplist.vue'),
    meta: {
      num: true
    },
    alias: ['/toplistabc']
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import('../views/Search.vue'),
    meta: {
      num: true
    }
  },
  {
    path: '/musiclist/:listid',
    name: 'MusicList',
    component: () => import('../views/MusicList.vue'),
    props: true,
    meta: {
      num: true
    }
  },
  {
    path: '/movie/:listid',
    name: 'Movie',
    component: () => import('../views/Movie.vue'),
    props: true,
    meta: {
      num: false
    }
  },
  {
    path: '/singertext/:listid/:keywords',
    name: 'Singertext',
    component: () => import('../views/SingerText.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to) {
    if (to.hash == '#hello') {
      //判断进入的路由是否有携带hash 如果有就滚动.
      return {
        x: 0,
        y: 0,
        behavior: 'smooth' //滚动过渡动画.
      }
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  }
})

export default router
