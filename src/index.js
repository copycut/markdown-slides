import Vue from 'vue'
import VueResizeText from 'vue-resize-text'
import store from './store'
import App from './components/app.vue'

Vue.use(VueResizeText)

new Vue({
  el: '#root',
  store,
  render: h => h(App),
})
