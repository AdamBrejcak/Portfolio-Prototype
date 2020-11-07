<template>
  <div class="portfolio">
      <div
        class="divImg"
        v-for="(section, index) in sections"
        :key="section.id"
      >
      <transition name="fade">
        <img
          class="image"
          v-show="index === activeSection"
          :src="section.sectionPhoto"
          alt="Section Photo"
        >
      </transition>
      <transition name="fade">
        <img
          class="image"
          v-show="activeSection === -1"
          src="https://images.pexels.com/photos/1122628/pexels-photo-1122628.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Section Photo"
        >
      </transition>
      </div>
    <ul>
      <li
        v-pointer
        v-for="(section, index) in sections"
        :key="section.id"
      >
      <router-link  :to="`galeria/${section.id}`">
      <span
        @mouseenter="setSection(index)"
        @mouseleave="setSection(-1)"
      >{{section.name}}
      </span>
      </router-link></li>
    </ul>
  </div>
</template>

<script>
import { getters } from "../store";

export default {
  name: "Portfolio",
  computed: {
    ...getters,
  },
  data() {
    return {
      activeSection: -1,
    };
  },
  mounted() {
    this.loader.loadingProgress = 100;
  },
  methods: {
    setSection(index) {
      this.activeSection = index;
    },
  },
};
</script>
