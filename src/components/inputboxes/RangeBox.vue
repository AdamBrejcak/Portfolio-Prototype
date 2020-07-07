<template>
  <div class="input-box input-box--range">
    <label>
      <slot name="label"></slot> : {{value}}
    </label>

    <input
      type="range"
      :value="getter"
      :step="step"
      :min="min"
      :max="max"
      @input="setter($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "RangeBox",
  props: [
    "value",
    "type",
    "step",
    "min",
    "max",
  ],
  computed: {
    getter() {
      if (!this.value) return "";
      return this.value.toString();
    },
  },
  methods: {
    setter(value) {
      this.$emit("input", parseInt(value, 10));
    },
  },
};
</script>
