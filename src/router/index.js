/*
路由器对象
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../pages/HomePage/HomePage.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'

Vue.use(VueRouter);

export default new VueRouter({
  //所有路由
  routes: [
    {
      path: '/homepage',
      component: HomePage
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/profile',
      component: Profile
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/',
      redirect: '/homepage'
    }
  ]
})
