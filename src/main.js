import Vue from "vue";
import App from "./App.vue";
import router from "@/router/index.js";
import store from "@/store/index.js";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style/reset.css";
import { setRem } from "@/utils/dom.js";

Vue.config.productionTip = false;
Vue.use(ElementUI);
setRem();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
