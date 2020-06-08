<template>
  <strong v-if="this.store.loadingText">{{this.store.loadingText}}</strong>
</template>

<script>
import { getters } from "../store";

export default {
  name: "Loader",
  computed: {
    ...getters,
  },
};
</script>
