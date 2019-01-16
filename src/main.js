import Vue from 'vue'
import App from './App.vue'
import router from './router'
import InstantSearch from 'vue-instantsearch'

Vue.use(InstantSearch)
Vue.config.productionTip = false

require('./assets/scss/app.scss')

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
