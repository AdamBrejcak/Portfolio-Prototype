<template>
  <div
    class="gallery__template"
    :class="{'gallery__template--active': index === activeTemplateIndex}"
    :style="{height: `${templateHeight}px`}"
    @click="$emit('showModal')"
    ref="template"
  >
    <div
      class="gallery__template__photo"
      v-for="(photo, index) in photos"
      :key="index + 1"
      :class="[
        `gallery__template__photo--column-start-${photo.columnStart}`,
        `gallery__template__photo--column-end-${photo.columnEnd}`,
        `gallery__template__photo--row-start-${photo.rowStart}`,
        `gallery__template__photo--row-end-${photo.rowEnd}`
      ]"
    >
      <img :src="photo.photoURL">
    </div>
  </div>
</template>

<script>
import { getters } from "../store";

export default {
  name: "Template",
  props: [
    "template",
    "activeTemplateIndex",
    "index",
  ],
  data() {
    return {
      isMounted: false,
    };
  },
  computed: {
    ...getters,
    isMobile() {
      const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];
      return toMatch.some((toMatchItem) => navigator.userAgent.match(toMatchItem))
        || this.store.enableMobileEditing;
    },
    templateHeight() {
      if (!this.isMounted) return 0;
      const { template } = this.$refs;
      const { ratio, responsiveRatio } = this.template;
      const finalRatio = this.isMobile ? responsiveRatio : ratio;
      return template.clientWidth * finalRatio;
    },
    photos() {
      const { photos, responsivePhotos } = this.template;
      return this.isMobile ? responsivePhotos : photos;
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
