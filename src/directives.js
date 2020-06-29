import Vue from "vue";

Vue.directive("pointer", {
  bind(el) {
    el.addEventListener("mouseenter", () => {
      const follower = document.getElementsByClassName("cursor-follower")[0];
      follower.classList.add("cursor-active");
    });
    el.addEventListener("mouseleave", () => {
      const follower = document.getElementsByClassName("cursor-follower")[0];
      follower.classList.remove("cursor-active");
    });
  },
});
