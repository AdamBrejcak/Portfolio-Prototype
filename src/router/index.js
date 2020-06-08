import Vue from "vue";
import VueRouter from "vue-router";
import All from "../views/All.vue";
import CreateSection from "../views/CreateSection.vue";

Vue.use(VueRouter);

const routes = [
  {
    name: "All",
    path: "/",
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

export default router;
