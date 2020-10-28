<template>
  <main>
    <Navigation/>

    <div class="error" style="background-image: url('https://images.pexels.com/photos/5086370/pexels-photo-5086370.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260')">
    <h1>404</h1>
    <h2>stránka neexistuje</h2>
    </div>

    <Social/>
  </main>
</template>

<script>
import { getters } from "../store";
import Navigation from "../components/Navigation.vue";
import Social from "../components/Social.vue";

export default {
  name: "PageNotFound",
  computed: {
    ...getters,
  },
  components: {
    Navigation,
    Social,
  },
  mounted() {
    this.loader.loadingProgress = 100;
  },
};

</script>
<style lang="scss" scoped >
main{
  background-color: #222222;
  // height: 100%;
}
.error{
  display: flex;
  color: rgb(255, 165, 0);
  opacity: .9;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  background-size: cover;
  background-repeat: no-repeat;
  object-fit: cover;
}
h1{
  font-size: 90px;
  padding-top: 250px;
}
h2{
  font-size: 40px;
}
</style>
