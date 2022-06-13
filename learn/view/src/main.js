import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Elementui from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 封装前
// import axios from 'axios'
import http from './http'

Vue.config.productionTip = false
// 封装前
// Vue.prototype.$axios = axios
Vue.prototype.$http = http

Vue.use(Elementui)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
