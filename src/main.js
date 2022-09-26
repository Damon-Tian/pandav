import Vue from "vue"
import App from "./App.vue"
import router from "./router"
// import VueRouter from "vue-router";

import "./assets/css"
import "./plugin/ui"

Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app")
