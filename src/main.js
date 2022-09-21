import Vue from "vue";
import App from "./App.vue";
import router from "./router";
// import VueRouter from "vue-router";
import dataV from "@jiaminghi/data-view";

import { Menu, MenuItem, Scrollbar } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Scrollbar);
Vue.use(dataV);

import "normalize.css";
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
