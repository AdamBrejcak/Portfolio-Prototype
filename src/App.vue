<template>
  <div id="app">
<!--    <navigation />-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Navigation from "./components/Navigation.vue";
import { getSections, getters } from "./store";
import "./directives";
import "./filters";

export default {
  name: "App",
  components: {
    // Navigation,
  },
  computed: {
    ...getters,
  },
  async created() {
    await getSections();
    this.store.dbLoaded = true;
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
