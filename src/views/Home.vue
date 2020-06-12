<template>
  <main id="home">
    <h1 style="position: absolute; opacity: 0">Deafeye photography</h1>
    <div class="slider">
      <div
        class="slide"
        v-for="(section, index) in store.sections"
        :key="section.id"
        :class="{'slide-show': currentSlide === index}"
      >
        <div class="background-holder">
          <div
            class="background"
            :style="{backgroundImage: `url(${section.sliderPhoto})`}"
          ></div>
        </div>

        <div class="slider-content">
          <h2>{{section.name}}</h2>

          <span>{{section.date | firestoreTimestampToStringDate}}</span>

          <button>
            <span>Zobraziť fotografie</span>
            <router-link :to="`galeria/${getGalleryLink(section.name)}`"></router-link>
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { getters } from "../store";
import { getGalleryLink } from "../utils/string";

export default {
  name: "Home",
  computed: {
    ...getters,
  },
  data() {
    return {
      currentSlide: 0,
    };
  },
  methods: {
    getGalleryLink,
  },
  mounted() {
    setInterval(() => {
      const sectionsLength = this.store.sections.length;
      if (this.currentSlide + 1 === sectionsLength) this.currentSlide = 0;
      else this.currentSlide += 1;
    }, 5500);
  },
};
</script>
