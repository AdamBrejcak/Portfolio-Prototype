<template>
  <nav
    class="navigation"
    :class="{'navigation--dark-mode': store.darkMode}"
  >
    <router-link v-pointer class="navigation__logo" to="/">
      <logo></logo>
      <span class="navigation__logo__text">DEAFEYE</span>
    </router-link>
  </nav>
</template>

<script>
import { getters } from "../store";
import Logo from "./Logo.vue";

export default {
  name: "Navigation",
  components: {
    Logo,
  },
  computed: {
    ...getters,
  },
};
</script>
