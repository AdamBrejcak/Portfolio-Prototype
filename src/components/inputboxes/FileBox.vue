<template>
  <div>
    <input
      type="file"
      ref="file"
      @change="$emit('input', $event.target.files[0])"
    >
  </div>
</template>

<script>
export default {
  name: "FileBox",
  props: [
    "value",
  ],
  watch: {
    value(newFile) {
      if (!newFile) this.$refs.file.value = "";
    },
  },
};
</script>
