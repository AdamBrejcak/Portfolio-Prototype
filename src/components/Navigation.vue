<template>
  <nav class="navigation">
    <router-link class="navigation__logo" to="/">
      <logo></logo>
      <span class="navigation__logo__text">DEAFEYE</span>
    </router-link>
  </nav>
</template>

<script>
import Logo from "./Logo.vue";

export default {
  name: "Navigation",
  components: {
    Logo,
  },
};
</script>
