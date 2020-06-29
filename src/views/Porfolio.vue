<template>
  <main>
    <div class="background" :style="{backgroundImage: computedImg}">
      <ul>
        <li v-for="item in items" :key="item.id">{{item.name}}</li>
      </ul>
      <button @click="getSection()"></button>
    </div>
  </main>
</template>

<script>
// import DB from "../firebaseInit";
import { getters } from "../store";

export default {
  name: "Portfolio",
  computed: {
    ...getters,
    computedImg() {
      return this.imgUrl;
    },
  },
  data() {
    return {
      items: [],
      imgSrc: "https://firebasestorage.googleapis.com/v0/b/deafeye-1539950687727.appspot.com/o/Peter_a_Petra_da998bb0-b4a9-11ea-a2ba-a3431d1e8e0b%2Fda998bb1-b4a9-11ea-a2ba-a3431d1e8e0b?alt=media&token=a5579a3d-d5f7-4f1a-b467-a669bed34b97",
      imgUrl: "url('this.imgSrc')",
    };
  },
  methods: {
    getSection() {
      this.items = this.sections;
      console.log(this.items);
    },
  },
  mounted() {
    this.loader.loadingProgress = 100;
  },
};
</script>
<style lang="scss" scoped>
  button{
    width: 50px;
    height: 30px;
    background-color: aqua;
  }

  .background{
    width: 100%;
    height: 1080px;

  }
</style>
