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
    <div class="content-holder">
      <!-- ------------------ Headline ------------------ -->
      <div
        class="headline-holder"
        :class="{'headline-holder--show': loader.loaderDone}"
      >
        <h2
          class="headline-holder__headline"
          v-for="(section, index) in sections"
          :key="index + 1"
          :class="{
          'headline-holder__headline--down':
            activeSection !== section.order && activeSection < section.order,
          'headline-holder__headline--up':
            activeSection !== section.order && activeSection > section.order
        }"
        >
        <span
          class="headline-holder__headline__char"
          v-for="(char, index) in splitText(section.name)"
          :key="index + 1"
        >{{char}}</span>
        </h2>
      </div>

      <!-- ------------------ Date ------------------ -->
      <div class="date-holder">
        <div
          class="date-holder__slider"
          :style="{transform: `translateY(-${(100 / sections.length) * activeSection}%)`}"
        >
          <p
            v-for="(section, index) in sections"
            :key="index + 1"
          >{{section.dateString}}</p>
        </div>
      </div>

      <button class="a" v-pointer>
        <span>Otvoriť</span>
        <router-link  to="galeria/daniel-a-kristina"></router-link>
      </button>
    </div>

    <!-- ------------------ Social links ------------------ -->
    <social></social>
  </main>
</template>

<script>
// Store
import { getters } from "../store";
// Components
import Social from "../components/Social.vue";

export default {
  name: "Home",
  components: {
    Social,
  },
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
    splitText(name) { return [...name]; },
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
      if (event.deltaY < 0) this.goUp();
      else if (event.deltaY > 0) this.goDown();
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
