<template>
  <div
    class="gallery"
    :class="{'gallery--auth': store.isAuth}"
    v-if="section"
  >
    <!-- ------------------ Template ------------------ -->
    <div
      class="gallery__template"
      v-for="(template, index) in section.templates"
      :key="index + 1"
      :class="{'gallery__template--active': index === activeTemplateIndex}"
      @click="showModal(index)"
    >
    </div>

    <!-- ------------------ Push template ------------------ -->
    <div class="gallery__template gallery__template--create">
      <button
        v-pointer
        @click="addTemplate"
      >Pridať šablonu</button>
    </div>

    <!-- ------------------ Modal window ------------------ -->
    <div
      class="modal"
      v-if="store.isAuth"
      :class="{
        'modal--show': modalVisible
      }"
    >
      <div
        class="modal__close"
        @click="hideModal"
        v-pointer
      >x</div>

      <div class="modal__content">
        <update-template
          v-if="activeTemplate"
          :template="activeTemplate"
        ></update-template>
      </div>
    </div>
  </div>
</template>

<script>
import { getters } from "../store";
import UpdateTemplate from "../components/UpdateTemplate.vue";
import DB from "../firebaseInit";

export default {
  name: "Gallery",
  components: {
    UpdateTemplate,
  },
  data() {
    return {
      modalVisible: false,
      activeTemplateIndex: -1,
    };
  },
  computed: {
    ...getters,
    loadedPercent() {
      return this.loader.dbLoaded ? 100 : 0;
    },
    section() {
      if (this.loader.dbLoaded) {
        return this.sections.find((section) => section.id === this.$route.params.id);
      }
      return undefined;
    },
    activeTemplate() {
      if (this.activeTemplateIndex === -1) return undefined;
      return this.section.templates[this.activeTemplateIndex];
    },
  },
  methods: {
    async addTemplate() {
      try {
        this.section.templates.push({
          photos: [],
          isResponsive: false,
          responsivePhotos: [],
        });

        await DB
          .collection("section")
          .doc(this.section.id)
          .set(this.section);
      } catch (err) {
        alert(err);
      }
    },
    showModal(index) {
      if (this.store.isAuth) {
        this.activeTemplateIndex = index;
        this.modalVisible = true;
      }
    },
    hideModal() {
      this.activeTemplateIndex = -1;
      this.modalVisible = false;
    },
  },
  watch: {
    loadedPercent: {
      handler(percent) {
        this.store.loader.loadingProgress = percent;
      },
      immediate: true,
    },
  },
  mounted() {
    this.store.darkMode = true;
  },
};
</script>
