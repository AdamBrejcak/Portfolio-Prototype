<template>
  <main></main>
</template>

<script>
import { getters } from "../store";

export default {
  name: "All",
  computed: {
    ...getters,
  },
};
</script>
