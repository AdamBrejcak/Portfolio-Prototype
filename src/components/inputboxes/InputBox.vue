<template>
  <div>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
      v-attr="attrs"
    >
  </div>
</template>

<script>
export default {
  name: "InputBox",
  props: [
    "attrs",
    "value",
  ],
};
</script>
