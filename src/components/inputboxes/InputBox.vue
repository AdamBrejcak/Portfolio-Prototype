<template>
  <div
    class="input-box"
    :class="{'input-box--has-value': getter.length > 0}"
  >
    <label>
      <slot name="label"></slot>
    </label>

    <input
      :type="type ? type : 'text'"
      :value="getter"
      :placeholder="placeholder"
      @input="setter($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "InputBox",
  props: [
    "value",
    "placeholder",
    "type",
  ],
  computed: {
    getter() {
      if (!this.value) return "";
      return this.value;
    },
  },
  methods: {
    setter(value) {
      this.$emit("input", value.trim());
    },
  },
};
</script>
