/*
  入口js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  /*components: {
    App
  },
  template: '<App/>',*/
  router, //使用上vue-rounter
  store //使用上store
})
