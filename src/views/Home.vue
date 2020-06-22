<template>
  <main class="home">
    <!-- ------------------ Section photos ------------------ -->
    <div class="photos">
      <div
        class="photos__holder"
        :style="{
          height: `${sections.length * 100}%`,
          transform: `translateY(${-(100 / sections.length) * activeSection}%)`
        }"
      >
        <div
          class="photos__holder__image"
          v-for="(section, index) in sections"
          :key="index + 1"
          :class="{
            'photos__holder__image--active': isActiveSection(section.order)
          }"
          :style="{order: section.order}"
        >
          <img :src="section.sectionPhoto" @load="loadedImages.push(index)">
        </div>
      </div>
    </div>

    <!-- ------------------ Grid ------------------ -->
    <div
      class="grid"
      :class="{'grid--show': loader.loaderDone}"
    >
      <div class="grid__vertical">
        <div class="grid__vertical__line"></div>
        <div class="grid__vertical__line"></div>
        <div class="grid__vertical__line"></div>
        <div class="grid__vertical__line"></div>
        <div class="grid__vertical__line"></div>
      </div>

      <div class="grid__horizontal">
        <div class="grid__horizontal__line"></div>
        <div class="grid__horizontal__line"></div>
        <div class="grid__horizontal__line"></div>
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
      activeSection: 0,
      mouseWheelAllow: true,
      loadedImages: [],
    };
  },
  computed: {
    ...getters,
    /*
    * Calculate loaded percent
    * */
    loadedPercent() {
      const { dbLoaded } = this.store.loader;
      let percent = 0;
      if (dbLoaded) {
        percent += 42;
        const imagesCount = this.sections.length;
        const loadedImagesCount = this.loadedImages.length;
        percent += (loadedImagesCount / imagesCount) * 68;
      }
      return percent;
    },
  },
  methods: {
    isActiveSection(order) {
      return this.loader.loaderDone && order === this.activeSection;
    },
    goUp() {
      if (this.activeSection !== 0) {
        if (this.mouseWheelAllow) {
          this.mouseWheelAllow = false;
          this.activeSection -= 1;
          setTimeout(() => { this.mouseWheelAllow = true; }, 2000);
        }
      }
    },
    goDown() {
      if (this.activeSection !== this.sections.length - 1) {
        if (this.mouseWheelAllow) {
          this.mouseWheelAllow = false;
          this.activeSection += 1;
          setTimeout(() => { this.mouseWheelAllow = true; }, 2000);
        }
      }
    },
    onMouseWheel(event) {
      console.log("MOUSEWHEEL", event);
      if (event.deltaY < 0) {
        this.goUp();
      } else if (event.deltaY > 0) {
        this.goDown();
      }
    },
  },
  watch: {
    loadedPercent(percent) {
      this.store.loader.loadingProgress = percent;
    },
  },
  mounted() {
    window.addEventListener("mousewheel", this.onMouseWheel);
  },
  destroyed() {
    window.removeEventListener("mousewheel", this.onMouseWheel);
  },
};
</script>
