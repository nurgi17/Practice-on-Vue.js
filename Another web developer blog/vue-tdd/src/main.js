import Vue from 'vue'
import App from './App.vue'
import Element from 'element-ui'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Element)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')