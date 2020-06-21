<template>
  <main id="home">
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
      loadedImages: [],
    };
  },
  computed: {
    ...getters,
    homeLoaded() {
      if (this.store.dbLoaded) return this.loadedImages.length === this.store.sections.length;
      return false;
    },
    currentImage() { return `#home .slider-image-${this.image}`; },
  },
  methods: {
    nextSlide() {
      this.image = this.image === this.store.sections.length - 1 ? 0 : this.image += 1;

      new this.$TimelineMax()
        .add(() => {
          // Hide current image

        })
        .add(() => {
          // Show next image
        });
    },
    slider() {
      this.$TweenMax.staggerTo("#home .horizontal .line", 1.5, { scale: 1 }, 0.2);
      this.$TweenMax.staggerTo("#home .vertical .line", 1.5, { scale: 1 }, 0.2);
      new this.$TimelineMax()
        .to(this.currentImage, 2, { opacity: 1 })
        .to(this.currentImage, 6, { scale: 1.2 }, "-=1.8");
    },
  },
  watch: {
    homeLoaded(isLoaded) {
      if (isLoaded) this.slider();
    },
  },
};
</script>
