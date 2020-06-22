<template>
  <div id="app">
<!--    <navigation />-->
    <router-view></router-view>
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
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
