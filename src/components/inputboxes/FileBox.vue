<template>
  <div
    class="file-box"
    :class="{'file-box--uploaded': value}"
  >
    <div class="file-box__label">
      <slot name="label"></slot>
    </div>

    <span
      class="file-box__name"
      v-if="value"
    >{{value.name}}</span>

    <label v-pointer>
      <span>{{value ? 'File uploaded' : 'Upload file'}}</span>
      <input
        type="file"
        ref="file"
        @change="$emit('input', $event.target.files[0])"
      >
    </label>
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
