<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { getSections } from "./store";
import "./directives";
import "./filters";

export default {
  name: "App",
  created() {
    getSections();
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
