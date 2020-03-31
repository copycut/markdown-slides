import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import { routes } from './routes'
import App from './pages/app.vue'
import VueI18n from 'vue-i18n'
import getBrowserLocale from './utilities/get-browser-locale'
import messages from './locales/locales.json'

Vue.use(VueRouter)
Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: getBrowserLocale(),
  fallbackLocale: 'en',
  messages,
})

const router = new VueRouter({
  routes,
})

new Vue({
  el: '#root',
  router,
  store,
  i18n,
  render: h => h(App),
})
