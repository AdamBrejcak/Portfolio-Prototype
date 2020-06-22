<template>
  <div id="app">
<!--    <navigation />-->
    <router-view></router-view>

    <div id="cursor"></div>

    <loader></loader>

  </div>
</template>

<script>
// Components
import Loader from "./components/Loader.vue";
// import Navigation from "./components/Navigation.vue";
// Store
import { getSections, getters } from "./store";
// Extenders
import "./directives";
import "./filters";

export default {
  name: "App",
  components: {
    Loader,
    // Navigation,
  },
  computed: {
    ...getters,
  },
  async created() {
    await getSections();
    this.store.loader.dbLoaded = true;
  },
  mounted() {
    const cursor = document.getElementById("cursor");
    window.addEventListener("mousemove", (event) => {
      if (event.target.classList.contains("cursor-pointer")) cursor.classList.add("cursor-pointer");
      else cursor.classList.remove("cursor-pointer");
      cursor.style.top = `${event.pageY - 7.5}px`;
      cursor.style.left = `${event.pageX - 7.5}px`;
    });
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
