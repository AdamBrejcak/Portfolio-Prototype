<template>
  <nav>
    <div class="navigation">
    <router-link to="/">Home</router-link>
    <router-link to="/portfolio">Portfolio</router-link>
    <router-link to="/create">Create Section</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navigation",
};
</script>

<style lang="scss" scoped>
.navigation{
    margin: 0 auto;
    font-size: 17px;
    height: 20px;
    width: 25%;
    router-link{
      width: 33%;
    }
  }
</style>
