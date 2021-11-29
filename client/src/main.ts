import axios from 'axios'
import PortalVue from 'portal-vue'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import { createStore } from './store'

axios.defaults.baseURL = 'http://localhost:8080'

Vue.use(PortalVue)

Vue.config.productionTip = false

new Vue({
  router,
  store: createStore(),
  render: h => h(App)
}).$mount('#app')
