<template>
  <div class="modal__content__create-section">
    <h3>Vytvoriť sekciu</h3>

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
      @click="addSection"
      v-pointer
    >Vytvoriť sekciu</button>

    <mini-loader v-if="loading"></mini-loader>
  </div>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import { getters, addSection, uploadFile } from "../store";
import { removeDiacritics } from "../utils/string";
import RadioBox from "./inputboxes/RadioBox.vue";
import InputBox from "./inputboxes/InputBox.vue";
import DatepickerBox from "./inputboxes/DatepickerBox.vue";
import FileBox from "./inputboxes/FileBox.vue";
import MiniLoader from "./MiniLoader.vue";

export default {
  name: "CreateSection",
  components: {
    RadioBox,
    InputBox,
    DatepickerBox,
    FileBox,
    MiniLoader,
  },
  data() {
    return {
      loading: false,
      darkMode: false,
      name: "",
      date: null,
      showValidations: false,
      sectionPhoto: null,
      sectionPhotoMobile: null,
    };
  },
  computed: {
    ...getters,
    errors() {
      const errors = [];
      if (this.name.length === 0) errors.push("Zabudol si na nazov sekcie.");
      if (!this.date) errors.push("Jaaaj, Aj datum musíš napísať.");
      if (!this.sectionPhoto) errors.push("Uploadni fotku ne.");
      if (!this.sectionPhotoMobile) errors.push("Uploadni fotku na mobil ne.");
      return errors;
    },
    newOrder() {
      if (this.sections.length === 0) return 0;
      const orders = this.sections.map((section) => section.order);
      return Math.max(...orders) + 1;
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
    async addSection() {
      try {
        if (this.errors.length === 0) {
          this.loading = true;

          const sectionStoragePath = `${removeDiacritics(this.name).split(" ").join("_")}_${uuidv1()}`;
          const sectionPhoto = await uploadFile(
            `${sectionStoragePath}/${uuidv1()}`,
            this.sectionPhoto,
          );

          const sectionPhotoMobile = await uploadFile(
            `${sectionStoragePath}/${uuidv1()}`,
            this.sectionPhotoMobile,
          );

          addSection({
            name: this.name,
            date: this.date,
            templates: [],
            storageRef: sectionStoragePath,
            sectionPhoto,
            sectionPhotoMobile,
            darkMode: this.darkMode,
            order: this.newOrder,
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
  },
};
</script>
