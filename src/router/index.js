import Vue from "vue";
import VueRouter from "vue-router";
import All from "../views/All.vue";
import CreateSection from "../views/CreateSection.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/portfolio",
    component: All,
  },
  {
    path: "/create",
    component: CreateSection,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
