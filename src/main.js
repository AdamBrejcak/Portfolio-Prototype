import Vue from "vue";
import { TimelineMax, TweenMax } from "gsap/all";
import App from "./App.vue";
import router from "./router";
import "./firebaseInit";

Vue.config.productionTip = false;

Vue.prototype.$TimelineMax = TimelineMax;
Vue.prototype.$TweenMax = TweenMax;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
