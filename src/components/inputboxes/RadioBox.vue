<template>
  <div class="radio-box">
    <button
      v-for="(option, index) in options"
      :key="index + 1"
      :class="{'selected': value === option.value}"
      @click="$emit('input', option.value)"
      v-pointer
    >{{option.label}}</button>
  </div>
</template>

<script>
export default {
  name: "RadioBox",
  props: [
    "value",
    "options",
  ],
};
</script>
