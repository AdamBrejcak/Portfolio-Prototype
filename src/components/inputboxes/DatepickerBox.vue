<template>
  <div class="input-box">
    <label>
      <slot name="label"></slot>
    </label>

    <input
      type="date"
      :value="getter"
      :placeholder="placeholder"
      @input="setter($event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: "DatepickerBox",
  props: [
    "attrs",
    "value",
    "placeholder",
  ],
  computed: {
    getter() {
      const { value } = this;
      if (value) {
        let month = value.getMonth() + 1;
        month = month <= 9 ? `0${month}` : month;

        let day = value.getDate();
        day = day <= 9 ? `0${day}` : day;

        return `${value.getFullYear()}-${month}-${day}`;
      }
      return null;
    },
  },
  methods: {
    setter(stringDate) {
      if (stringDate) {
        const date = new Date(stringDate);
        this.$emit("input", date);
      } else {
        this.$emit("input", null);
      }
    },
  },
};
</script>
