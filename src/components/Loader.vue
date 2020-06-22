<template>
  <div
    class="loader"
    :class="{'loader--hide': !loader.showLoader}"
  >
    <!-- ------------- Left side ------------- -->
    <div class="loader__left-side">
      <div class="loader__left-side__background"></div>
      <em
        class="loader__left-side__progress"
        :class="{'loader__left-side__progress--show': showLoadingProgress}"
      >
        {{animatePercent}}
      </em>
    </div>

    <!-- ------------- Right side ------------- -->
    <div class="loader__right-side">
      <div class="loader__right-side__background"></div>
      <em
        class="loader__right-side__progress"
        :class="{'loader__right-side__progress--show': showLoadingProgress}"
      >
        {{animatePercent}}
      </em>
    </div>

    <!-- ------------- Progress line ------------- -->
    <div class="loader__vertical-line">
      <span class="loader__vertical-line__default"></span>
      <span
        class="loader__vertical-line__progress"
        :style="{transform: `scale(${loadingProgress / 100})`}"
      ></span>
    </div>
  </div>
</template>

<script>
import { getters } from "../store";

export default {
  name: "Loader",
  data() {
    return {
      interval: null,
      animatePercent: 0,
    };
  },
  computed: {
    ...getters,
    loadingProgress() { return this.loader.loadingProgress; },
    showLoadingProgress() { return this.animatePercent > 0 && this.animatePercent < 100; },
  },
  watch: {
    /*
    * Loading progress animation
    * */
    loadingProgress: {
      handler(newPercent) {
        if (this.interval !== null) clearInterval(this.interval);

        if (this.animatePercent < 100) {
          const intervalTime = 500 / (newPercent - this.animatePercent);

          this.interval = setInterval(() => {
            if (this.animatePercent < newPercent) this.animatePercent += 1;
          }, intervalTime);
        }
      },
      immediate: true,
    },
    /*
    * Hide loader after animation is done
    * */
    animatePercent(newPercent) {
      if (newPercent === 100) {
        this.loader.showLoader = false;
        setTimeout(() => { this.loader.loaderDone = true; }, 800);
      }
    },
  },
};
</script>
