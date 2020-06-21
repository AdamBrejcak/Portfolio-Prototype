<template>
  <main id="home">
    <div class="big-slider">
      <img
        class="slider-image"
        v-for="(section, index) in store.sections"
        :key="index + 1"
        :src="section.sliderPhoto"
        :class="[`slider-image-${index}`]"
      >
    </div>

    <grid></grid>
  </main>
</template>

<script>
// Components
import Grid from "../components/Grid.vue";
// Store
import { getters } from "../store";
// Utils

export default {
  name: "Home",
  components: {
    Grid,
  },
  data() {
    return {
      image: 0,
    };
  },
  computed: {
    ...getters,
    currentImage() { return `#home .slider-image-${this.image}`; },
  },
  mounted() {
    // new this.$TimelineMax()
    //   .to(this.currentImage, 3, { scale: 1.3 });
  },
};
</script>
