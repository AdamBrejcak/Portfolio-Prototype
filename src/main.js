import firebase from "firebase";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./firebaseInit";

Vue.config.productionTip = false;

// tslint:disable-next-line:prefer-const
let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      render: (h) => h(App),
    }).$mount("#app");
  }
});
