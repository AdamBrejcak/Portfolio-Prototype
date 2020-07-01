<template>
  <main>
      <ul>
        <li v-for="(section, index) in sections" :key="section.id"
        @mouseenter="changeImg(index)"
        @mouseleave="origImg()"
        >{{section.name}} {{index}}</li>
        <transition name="fade">
        <img class="background" :src="link" :key="link">
        </transition>
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
      imageIndex: "",
      link: "https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg?cs=srgb&dl=alpy-denne-svetlo-diva-priroda-divocina-167684.jpg&fm=jpg",
    };
  },
  methods: {
    mounted() {
      this.loader.loadingProgress = 100;
    },
    changeImg(index) {
      this.link = this.sections[index].sectionPhoto;
    },
    origImg() {
      this.link = "https://images.pexels.com/photos/167684/pexels-photo-167684.jpeg?cs=srgb&dl=alpy-denne-svetlo-diva-priroda-divocina-167684.jpg&fm=jpg";
    },
  },
};
</script>
<style lang="scss" scoped>
  button{
    width: 50px;
    height: 30px;
    background-color: aqua;
    margin-top: 200px;
  }

  .background{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0px;
    top: 0px;
  }

  ul{
    padding-top: 150px;
  }
  li{
    margin: 30px;
    z-index: 9;
  }

 .fade-enter-active, .fade-leave-active{
    transition: opacity .7s;
  }
  .fade-enter, .fade-leave-to{
    opacity: 0;
  }
</style>
