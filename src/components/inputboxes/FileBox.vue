<template>
  <div>
    <input
      type="file"
      @change="$emit('input', $event.target.files[0])"
    >
  </div>
</template>

<script>
export default {
  name: "FileBox",
};
</script>
