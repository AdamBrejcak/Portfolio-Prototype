import Vue from "vue";
import firebase from "firebase";
import VueRouter from "vue-router";
import { getters } from "../store";
import Portfolio from "../views/Porfolio.vue";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Gallery from "../views/Gallery.vue";

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
    name: "Gallery",
    path: "/galeria/:id",
    component: Gallery,
  },
  {
    name: "Login",
    path: "/login",
    component: Login,
    meta: {
      requiresGuest: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const store = getters.store();
  store.darkMode = false;

  store.loader.showLoader = true;
  store.loader.loadingProgress = 0;
  store.loader.loaderDone = false;
  setTimeout(() => {
    if (to.matched.some((record) => !record.meta.requiresAuth
      && !record.meta.requiresGuest)) next();
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!firebase.auth().currentUser) {
        next({ path: "/login", query: { redirect: to.fullPath } });
      } else next();
    } else if (to.matched.some((record) => record.meta.requiresGuest)) {
      if (firebase.auth().currentUser) {
        next({ path: "/", query: { redirect: to.fullPath } });
      } else next();
    } next();
  }, 1000);
});

export default router;
