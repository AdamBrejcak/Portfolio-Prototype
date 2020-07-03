<template>
  <div class="photo-update">
    <h4>Fotografia {{index + 1}}</h4>

    <range-box v-model="x" min="1" max="9" step="1">
      <template slot="label">
        Horizontál začiatok
      </template>
    </range-box>
  </div>
</template>

<script>
import RangeBox from "./inputboxes/RangeBox.vue";

export default {
  name: "UpdatePhoto",
  components: {
    RangeBox,
  },
  props: [
    "index",
  ],
  data() {
    return {
      x: 1,
    };
  },
};
</script>
