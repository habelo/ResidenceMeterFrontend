import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    },
    {
    path: '/login',
    name: 'login',
    component: () => import('./views/start/Login.vue')
    },
    {
    path: '/new-user',
    name: 'new-user',
    component: () => import('./views/start/NewUser.vue')
    },
    {
    path: '/profile',
    name: 'profile',
    component: () => import('./views/start/Profile.vue')
    }
  ]
})
