<template>
  <div
    class="input-box"
    :class="{'input-box--has-value': getter.length > 0}"
  >
    <label>
      <slot name="label"></slot>
    </label>

    <input
      type="number"
      :value="getter"
      :placeholder="placeholder"
      @input="setter($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "NumberBox",
  props: [
    "value",
    "placeholder",
  ],
  computed: {
    getter() {
      if (!this.value) return "";
      return this.value.toString();
    },
  },
  methods: {
    setter(value) {
      this.$emit("input", parseFloat(value));
    },
  },
};
</script>
