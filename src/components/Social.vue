<template>
  <div>
    <a
      target="_blank"
      rel="noopener noreferrer"
      class="facebook-holder"
      href="https://www.facebook.com/deafeyephotography"
      v-pointer
    >
      <span class="facebook-holder__text">FACEBOOK</span>
    </a>

    <a
      target="_blank"
      rel="noopener noreferrer"
      class="instagram-holder"
      href="https://www.instagram.com/deafeyephotography/"
      v-pointer
    >
      <span class="facebook-holder__text">INSTAGRAM</span>
    </a>
  </div>
</template>

<script>
export default {
  name: "Social",
};
</script>
<style lang="scss" scoped>
 div > * {
    pointer-events: auto;
  }
  div:hover > a{
    opacity: 0.5;
  }
  div:hover a:hover{
    opacity: 1;
  }
</style>
