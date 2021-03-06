<template>
  <div class="modal__content__create-section">
    <h3>Upraviť sekciu</h3>

    <radio-box
      v-model="darkMode"
      :options="[
        { label: 'Light mode', value: false },
        { label: 'Dark mode', value: true },
      ]"
    ></radio-box>

    <input-box
      v-model="name"
      placeholder="Názov sekcie"
      class="input-box--white"
    >
      <template slot="label">Názov sekcie*</template>
    </input-box>

    <datepicker-box
      v-model="date"
      placeholder="Dátum"
      class="input-box--white"
    >
      <template slot="label">Dátum*</template>
    </datepicker-box>

    <file-box
      v-model="sectionPhoto"
    >
      <template slot="label">Fotografia*</template>
    </file-box>

    <file-box
      v-model="sectionPhotoMobile"
    >
      <template slot="label">Fotografia pre mobil*</template>
    </file-box>

    <ul
      class="modal__content__create-section__validations"
      v-if="errors.length > 0 && showValidations"
    >
      <li
        v-for="(error, index) in errors"
        :key="index + 1"
      >{{error}}</li>
    </ul>

    <button
      class="small-button"
      @click="updateSection"
      v-pointer
    >Upraviť sekciu</button>
    <button
      class="small-button to-right"
      @click="deleteSection"
      v-pointer
    >Vymazať sekciu</button>
    <mini-loader v-if="loading"></mini-loader>
  </div>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import DB from "../firebaseInit";
import { getters, updateSection, uploadFile } from "../store";
import RadioBox from "./inputboxes/RadioBox.vue";
import InputBox from "./inputboxes/InputBox.vue";
import DatepickerBox from "./inputboxes/DatepickerBox.vue";
import FileBox from "./inputboxes/FileBox.vue";
import MiniLoader from "./MiniLoader.vue";

export default {
  name: "UpdateSection",
  components: {
    RadioBox,
    InputBox,
    DatepickerBox,
    FileBox,
    MiniLoader,
  },
  props: [
    "activeSection",
  ],
  data() {
    return {
      loading: false,
      darkMode: false,
      name: "",
      date: null,
      showValidations: false,
      sectionPhoto: null,
      templates: [],
      sectionPhotoMobile: null,
      order: 0,
      sectionStoragePath: "",
      dbSectionPhoto: "",
      dbSectionPhotoMobile: "",
      id: "",
    };
  },
  computed: {
    ...getters,
    errors() {
      const errors = [];
      if (this.name.length === 0) errors.push("Zabudol si na nazov sekcie.");
      if (!this.date) errors.push("Jaaaj, Aj datum musíš napísať.");
      return errors;
    },
  },
  methods: {
    resetForm() {
      this.showValidations = false;
      this.name = "";
      this.date = null;
      this.sectionPhoto = null;
      this.sectionPhotoMobile = null;
    },
    async updateSection() {
      try {
        if (this.errors.length === 0) {
          this.loading = true;

          let sectionPhoto;
          if (this.sectionPhoto) {
            sectionPhoto = await uploadFile(
              `${this.sectionStoragePath}/${uuidv1()}`,
              this.sectionPhoto,
            );
          }

          let sectionPhotoMobile;
          if (this.sectionPhotoMobile) {
            sectionPhotoMobile = await uploadFile(
              `${this.sectionStoragePath}/${uuidv1()}`,
              this.sectionPhotoMobile,
            );
          }

          updateSection({
            name: this.name,
            date: this.date,
            templates: [],
            storageRef: this.sectionStoragePath,
            sectionPhoto: !this.sectionPhoto ? this.dbSectionPhoto : sectionPhoto,
            sectionPhotoMobile: !this.sectionPhotoMobile
              ? this.dbSectionPhotoMobile
              : sectionPhotoMobile,
            darkMode: this.darkMode,
            order: this.order,
            id: this.id,
          });

          this.resetForm();
          this.$emit("close");
          this.loading = false;
        } else {
          this.showValidations = true;
        }
      } catch (err) {
        this.store.loadingText = null;
        console.error(err);
      }
    },

    async deleteSection() {
      const foundSection = this.sections.find((section) => section.order === this.activeSection);
      console.log(foundSection);

      const code = Math.floor(Math.random() * 10000);
      const promptRes = prompt(`Vpíš kód ${code}`);
      if (promptRes && promptRes.toUpperCase() === code.toString().toUpperCase()) {
        this.store.sections.splice(this.activeSection, 1);
        await DB.collection("section").doc(foundSection.id).delete().then(() => {
          console.log("Document successfully deleted!");
          this.$router.go();
        })
          .catch((error) => {
            console.error("Error removing document: ", error);
          });
      }
    },
  },


  mounted() {
    const foundSection = this.sections.find((section) => section.order === this.activeSection);
    if (foundSection) {
      this.name = foundSection.name;
      this.date = new Date(foundSection.date.seconds * 1000);
      this.darkMode = foundSection.darkMode;
      this.order = foundSection.order;
      this.templates = foundSection.templates;
      this.sectionStoragePath = foundSection.storageRef;
      this.dbSectionPhoto = foundSection.sectionPhoto;
      this.dbSectionPhotoMobile = foundSection.sectionPhotoMobile;
      this.id = foundSection.id;
    }
  },
};
</script>
