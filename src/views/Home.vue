<template>
  <main class="home">
    <!-- ------------------ Section photos ------------------ -->
    <div class="home-photos">
      <div
        class="home-photos__holder"
        :style="{
          height: `${sections.length * 100}%`,
          transform: `translateY(${-(100 / sections.length) * activeSection}%)`
        }"
      >
        <div
          class="home-photos__holder__image"
          v-for="(section, index) in sections"
          :key="index + 1"
          :class="{
            'home-photos__holder__image--active': isActiveSection(section.order)
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
      :class="{'grid--show': loader.loaderDone && showGrid}"
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

    <!-- ------------------ Section content ------------------ -->
    <div class="home-content">
      <h2>
        <span>Adam a Klaudia</span>
      </h2>
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
      mouseWheelAllow: false,
      showGrid: true,
      loadedImages: [],
    };
  },
  computed: {
    ...getters,
    loaderDone() { return this.loader.loaderDone; },
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
          this.showGrid = false;
          this.mouseWheelAllow = false;
          this.activeSection -= 1;
          setTimeout(() => { this.showGrid = true; }, 600);
          setTimeout(() => { this.mouseWheelAllow = true; }, 1700);
        }
      }
    },
    goDown() {
      if (this.activeSection !== this.sections.length - 1) {
        if (this.mouseWheelAllow) {
          this.showGrid = false;
          this.mouseWheelAllow = false;
          this.activeSection += 1;
          setTimeout(() => { this.showGrid = true; }, 600);
          setTimeout(() => { this.mouseWheelAllow = true; }, 1700);
        }
      }
    },
    onMouseWheel(event) {
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
    loaderDone(done) {
      if (done) this.mouseWheelAllow = true;
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
