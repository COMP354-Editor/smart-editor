import Vue from 'vue'
import vuetify from './plugins/vuetify'

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

// event bus
export const bus = new Vue();

/* eslint-disable no-new */
new Vue({
  vuetify,
  components: { App },
  template: '<App/>'
}).$mount('#app')
