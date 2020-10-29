import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import ColumnDetail from '../views/ColumnDetail.vue'
import CreatePost from '../views/CreatePost.vue'
import store from '../store'
import axios from 'axios'

const routerHistory = createWebHistory()
const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectAlreadyLogin: true
      }
    },
    {
      path: '/signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/column/:id',
      name: 'column',
      component: ColumnDetail
    },
    {
      path: '/create',
      name: 'createPost',
      component: CreatePost,
      meta: {
        requiredLogin: true
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(store.state.user.isLogin)
  // if (to.meta.requiredLogin && !store.state.user.isLogin) {
  //   console.log(store.state.user.isLogin)
  //   next('/login')
  // } else if (to.meta.redirectAlreadyLogin && store.state.user.isLogin) {
  //   console.log(store.state.user.isLogin)
  //   next('/')
  // }
  // next()

  // redirectAlreadyLogin: 登录之后需要重定向,例如login页面
  // requiredLogin: 需要登录才能访问,例如创建文章页面
  if (store.state.user.isLogin) {
    if (to.meta.redirectAlreadyLogin) {
      // 登录之后需要重定向
      next('/')
    } else {
      next()
    }
  } else {
    // 如果有token
    if (localStorage.getItem('token')) {
      axios.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
      store.dispatch('fetchCurrentUser').then(() => {
        if (to.meta.redirectAlreadyLogin) {
          next('/')
        } else {
          next()
        }
      }).catch(() => {
        // token可能失效,清除然后跳转登录页
        store.commit('logout')
        // localStorage.removeItem('token')
        next('/login')
      })
    } else {
      if (to.meta.requiredLogin) {
        next('/login')
      } else {
        next()
      }
    }
  }
})

export default router
