<template>
  <main id="home">
    <!-- ------------------ SLIDER ------------------ -->
    <div class="big-slider">
      <img
        class="slider-image"
        v-for="(section, index) in store.sections"
        :key="index + 1"
        :src="section.sliderPhoto"
        :class="[`slider-image-${index}`]"
        @load="loadedImages.push(index)"
      >
    </div>

    <!-- ------------------ GRID ------------------ -->
    <div class="grid">
      <div class="vertical">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>

      <div class="horizontal">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
    </div>
  </main>
</template>

<script>
// Store
import { getters } from "../store";
// Utils

export default {
  name: "Home",
  data() {
    return {
      image: 0,
      loadedImages: [],
    };
  },
  computed: {
    ...getters,
    loadedPercent() {
      const { dbLoaded } = this.store.loader;
      let percent = 0;
      if (dbLoaded) {
        percent += 50;
        const imagesCount = this.store.sections.length;
        const loadedImagesCount = this.loadedImages.length;
        percent += (loadedImagesCount / imagesCount / 2) * 100;
      }
      return percent;
    },
  },
  watch: {
    loadedPercent(percent) {
      this.store.loader.loadingProgress = percent;
      // if (percent === 100) console.log("HOME PAGE IS LOADED!");
    },
  },
};
</script>
