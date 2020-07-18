<template>
  <div
    class="gallery"
    :class="{
      'gallery--auth': store.isAuth,
      'gallery--mobile-version': store.enableMobileEditing
    }"
    v-if="section"
  >
    <!-- ------------------ Template ------------------ -->
    <gallery-template
      class="gallery__template"
      v-for="(template, index) in section.templates"
      :key="index + 1"
      :template="template"
      :index="index"
      :activeTemplateIndex="activeTemplateIndex"
      @showModal="showModal(index)"
    >
    </gallery-template>

    <!-- ------------------ Push template ------------------ -->
    <div
      class="gallery__template gallery__template--create"
      v-if="store.isAuth"
    >
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
          :section="section"
          :template="activeTemplate"
          @remove="removeTemplate"
          @hide="hideModal"
        ></update-template>
      </div>
    </div>
  </div>
</template>

<script>
import { getters } from "../store";
import UpdateTemplate from "../components/UpdateTemplate.vue";
import GalleryTemplate from "../components/Template.vue";
import DB from "../firebaseInit";

export default {
  name: "Gallery",
  components: {
    UpdateTemplate,
    GalleryTemplate,
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
          responsivePhotos: [],
          ratio: 0.5625,
          responsiveRatio: 1.7787,
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
      this.store.enableMobileEditing = false;
      this.modalVisible = false;
    },
    removeTemplate() {
      try {
        const code = Math.floor(Math.random() * 10000);
        const promptRes = prompt(`Vpíš kód ${code}`);
        if (promptRes && promptRes.toUpperCase() === code.toString().toUpperCase()) {
          this.section.templates.splice(this.activeTemplateIndex, 1);
          DB
            .collection("section")
            .doc(this.section.id)
            .set(this.section);
          this.hideModal();
        }
      } catch (err) {
        alert(err);
      }
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
