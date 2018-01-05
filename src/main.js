import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router'
import axios from 'axios'
import App from './app'

Vue.use(VueRouter)

// router
const router = new VueRouter({
  mode: 'history',
  routes
})

// ajax
Vue.prototype.$http = axios.create({
  timeout: 30000
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
