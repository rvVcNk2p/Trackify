import PortalVue from 'portal-vue'
import Vue from 'vue'

import App from './App.vue'
import router from './router'
import { createStore } from './store'

Vue.use(PortalVue)

Vue.config.productionTip = false

new Vue({
  router,
  store: createStore(),
  render: h => h(App)
}).$mount('#app')
