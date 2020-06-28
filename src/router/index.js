import Vue from "vue";
import firebase from "firebase";
import VueRouter from "vue-router";
import { getters } from "../store";
import Portfolio from "../views/Porfolio.vue";
import CreateSection from "../views/CreateSection.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

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
    component: Portfolio,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
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

  if (to.matched.some((record) => !record.meta.requiresAuth && !record.meta.requiresGuest)) next();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next({ path: "/login", query: { redirect: to.fullPath } });
    } else next();
  } else if (to.matched.some((record) => record.meta.requiresGuest)) {
    if (firebase.auth().currentUser) {
      next({ path: "/", query: { redirect: to.fullPath } });
    } else next();
  } next();
});

export default router;
