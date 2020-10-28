<template>
  <main>
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
    <ul

    :style="columns">
      <li
        v-pointer
        v-for="(section, index) in sections"
        :key="section.id"
      >
      <router-link  :to="`galeria/${section.id}`"><span
        @mouseenter="setSection(index)"
        @mouseleave="setSection(-1)"
      >{{section.name}}</span></router-link></li>
    </ul>
  </main>
</template>

<script>
import { getters } from "../store";

export default {
  name: "Portfolio",
  computed: {
    ...getters,
    columns() {
      if (this.sections.length === 1 || window.innerWidth < 600) {
        return { columns: 1 };
      }
      return { columns: 2 };
    },
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
<style lang="scss" scoped>
  .image, .divImg{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
  }
  ul{
    padding-top: 180px;
    pointer-events: none;
  }
  li{
    padding: 50px;
    font-size: 30px;
    z-index: 9;
    text-align: center;
    transition: 1s;
    width: fit-content;
    margin: 0 auto;
    padding: 25px 0;;
  }
  ul > * {
    pointer-events: auto;
  }
  ul:hover > li{
    opacity: 0.5;
  }
  ul:hover li:hover{
    opacity: 1;
  }
 .fade-enter-active, .fade-leave-active{
    transition: opacity .9s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
