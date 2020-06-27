import Vue from "vue";
import VueRouter from "vue-router";
import { getters } from "../store";
import All from "../views/All.vue";
import CreateSection from "../views/CreateSection.vue";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "Home",
    path: "/",
    component: Home,
  },
  {
    name: "Portfolio",
    path: "/portfolio",
    component: All,
  },
  {
    name: "Create Section",
    path: "/create",
    component: CreateSection,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  getters.store().darkMode = false;
  next();
});

export default router;
