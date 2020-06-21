<template>
  <div id="app">
<!--    <navigation />-->
    <router-view></router-view>
  </div>
</template>

<script>
// import Navigation from "./components/Navigation.vue";
import { getSections } from "./store";
import "./directives";
import "./filters";

export default {
  name: "App",
  components: {
    // Navigation,
  },
  async created() {
    await getSections();
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
