import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

const routes = [
  { path: "/", component: () => import("@/views/index.vue") },
  { path: "/home", component: () => import("@/views/index.vue") },
  {
    path: "/screen",
    component: () => import("@/views/screen/index.vue")
  },
  { path: "/login", component: () => import("@/views/login/index.vue") }
];

const router = new VueRouter({
  routes
});

export default router;
