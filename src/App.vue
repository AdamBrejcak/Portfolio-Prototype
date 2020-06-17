<template>
  <div id="app">
    <navigation />
  </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import { getSections } from "./store";
import "./directives";
import "./filters";

export default {
  name: "App",
  created() {
    getSections();
  },
  components: {
    Navigation,
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
