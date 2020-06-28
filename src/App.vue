<template>
  <div id="app">
    <!-- ------------------ Web content ------------------ -->
    <router-view></router-view>

    <!-- ------------------ Page loader ------------------ -->
    <navigation></navigation>

    <!-- ------------------ Page loader ------------------ -->
    <loader></loader>

    <!-- ------------------ Cursor ------------------ -->
    <div class="cursor-follower select-off"></div>
    <div class="cursor select-off"></div>
  </div>
</template>

<script>
import firebase from "firebase";
// Components
import Loader from "./components/Loader.vue";
import Navigation from "./components/Navigation.vue";
// Store
import { getSections, getters } from "./store";
// Utils
import cursor from "./utils/cursor";
// Extenders
import "./directives";
import "./filters";

export default {
  name: "App",
  components: {
    Loader,
    Navigation,
  },
  computed: {
    ...getters,
  },
  async created() {
    await getSections();
    this.store.loader.dbLoaded = true;
  },
  mounted() {
    const { currentUser } = firebase.auth();
    if (currentUser) { this.store.isAuth = true; }

    cursor();
  },
};
</script>

<style lang="scss">
  @import "assets/scss/app";
</style>
