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
      :class="{
        'grid--show': loader.loaderDone && showGrid,
        'grid--dark-mode': store.darkMode,
      }"
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
            activeSection !== section.order && activeSection > section.order,
          'headline-holder__headline--dark-mode': section.darkMode,
          }"
          :style="{order: section.order}"
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
          :style="{
            transform: `translateY(-${(100 / sections.length) * activeSection}%)`,
            height: `${sections.length * 110}%`
          }"
        >
          <p
            v-for="(section, index) in sections"
            :key="index + 1"
            :class="{'dark-mode': section.darkMode}"
            :style="{order: section.order}"
          >{{section.dateString}}</p>
        </div>
      </div>

      <button class="a" v-pointer>
        <span>Otvoriť</span>
        <router-link  to="galeria/daniel-a-kristina"></router-link>
      </button>
    </div>

    <!-- ------------------ Social links ------------------ -->
    <social :class="{'dark-mode': store.darkMode}"></social>

    <!-- ------------------ Portfolio link ------------------ -->
    <router-link
      class="portfolio-link"
      to="/portfolio"
      v-pointer
      :class="{'portfolio-link--dark-mode': store.darkMode}"
    >PORTFÓLIO</router-link>

    <!-- ------------------ Create section ------------------ -->
    <button
      class="button-circle create-section-button"
      v-pointer
      v-if="store.isAuth"
      @click="showCreateModal = true"
      :class="{'create-section-button--hide': showCreateModal}"
    >+</button>

    <div
      class="modal"
      v-if="store.isAuth"
      :class="{
        'modal--show': showCreateModal
      }"
    >
      <div
        class="modal__close"
        @click="showCreateModal = false"
        v-pointer
      >x</div>

      <div class="modal__content">
        <create-section
          v-if="showCreateModal"
          @close="showCreateModal = false"
        ></create-section>
      </div>
    </div>

    <!-- ------------------ Update section ------------------ -->
    <span
      class="update-section-button"
      v-pointer
      v-if="store.isAuth"
      @click="showUpdateModal = true"
      :class="{'create-section-button--hide': showUpdateModal}"
    >UPRAVIŤ</span>

    <div
      class="modal"
      v-if="store.isAuth"
      :class="{
        'modal--show': showUpdateModal
      }"
    >
      <div
        class="modal__close"
        @click="showUpdateModal = false"
        v-pointer
      >x</div>

      <div class="modal__content">
        <update-section
          v-if="showUpdateModal"
          :activeSection="activeSection"
          @close="showUpdateModal = false"
        ></update-section>
      </div>
    </div>
  </main>
</template>

<script>
// Store
import { getters } from "../store";
// Components
import Social from "../components/Social.vue";
import CreateSection from "../components/CreateSection.vue";
import UpdateSection from "../components/UpdateSection.vue";

export default {
  name: "Home",
  components: {
    Social,
    CreateSection,
    UpdateSection,
  },
  data() {
    return {
      activeSection: 0,
      mouseWheelAllow: false,
      showGrid: true,
      loadedImages: [],
      touchStart: 0,
      distance: 0,
      showCreateModal: false,
      showUpdateModal: false,
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
      if (this.activeSection !== 0 && !this.showCreateModal && !this.showUpdateModal) {
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
      if (
        this.activeSection !== this.sections.length - 1
        && !this.showCreateModal
        && !this.showUpdateModal
      ) {
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
    onTouchStart(event) {
      const swipe = event.touches;
      this.touchStart = swipe[0].pageY;
      window.addEventListener("touchmove", this.onTouchMove);
    },
    onTouchMove(event) {
      const contact = event.touches;
      const touchEnd = contact[0].pageY;
      this.distance = touchEnd - this.touchStart;
    },
    onTouchEnd() {
      window.removeEventListener("touchmove", this.onTouchMove);
    },
  },
  watch: {
    loadedPercent(percent) {
      this.store.loader.loadingProgress = percent;
    },
    loaderDone(done) {
      if (done) this.mouseWheelAllow = true;
    },
    activeSection(sectionIndex) {
      const foundSection = this.sections.find((section) => section.order === sectionIndex);
      this.store.darkMode = foundSection?.darkMode;
    },
    distance(newDistance) {
      if (newDistance > 50) this.goUp();
      else if (newDistance < -50) this.goDown();
    },
  },
  mounted() {
    window.addEventListener("mousewheel", this.onMouseWheel);
    window.addEventListener("touchstart", this.onTouchStart);
    window.addEventListener("touchend", this.onTouchEnd);
  },
  destroyed() {
    window.removeEventListener("mousewheel", this.onMouseWheel);
    window.removeEventListener("touchstart", this.onTouchStart);
    window.removeEventListener("touchend", this.onTouchEnd);
    window.removeEventListener("touchmove", this.onTouchMove);
  },
};
</script>
