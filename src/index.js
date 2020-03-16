import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { routes } from './routes'
import App from './pages/app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes,
})

new Vue({
  el: '#root',
  router,
  store,
  render: h => h(App),
})
