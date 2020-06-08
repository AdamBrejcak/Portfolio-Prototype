import Vue from "vue";
import VueRouter from "vue-router";
import All from "../views/All.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "All",
    path: "/",
    component: All,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
