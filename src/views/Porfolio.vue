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
    <ul>
      <li
        class="list"
        v-for="(section, index) in sections"
        :key="section.id"
        @mouseenter="setSection(index)"
        @mouseleave="setSection(-1)"
      >{{section.name}}</li>
    </ul>
  </main>
</template>

<script>
// import DB from "../firebaseInit";
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
  methods: {
    setSection(index) {
      this.activeSection = index;
    },
  },
  mounted() {
    this.loader.loadingProgress = 100;
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
  }
  ul{
    padding-top: 150px;
    columns: 3;
    -webkit-columns: 3;
    -moz-columns: 3;
  }
  li{
    padding: 50px;
    font-size: 30px;
    z-index: 9;
    text-align: center;
    opacity: 0.4;
    transition: 1s;
    width: auto;
  }
  li:hover{
    opacity: 1;
  }
 .fade-enter-active, .fade-leave-active{
    transition: opacity .9s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
