import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// import VueRouter from "vue-router";

import "./assets/css"
import "./plugin/ui"
import store from './store'
Vue.config.productionTip = false
import "./permission"
new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
