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

    <input-box
      v-model="description"
      placeholder="Popis"
      class="input-box--white"
    >
      <template slot="label">Popis sekcie</template>
    </input-box>

    <input-box
      v-model="place"
      placeholder="Miesto"
      class="input-box--white"
    >
      <template slot="label">Miesto</template>
    </input-box>

    <file-box
      v-model="sectionPhoto"
    >
      <template slot="label">Fotografia*</template>
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
      description: "",
      date: null,
      place: "",
      showValidations: false,
      sectionPhoto: null,
    };
  },
  computed: {
    ...getters,
    errors() {
      const errors = [];
      if (this.name.length === 0) errors.push("Zabudol si na nazov sekcie.");
      if (!this.date) errors.push("Jaaaj, Aj datum musíš napísať.");
      if (!this.sectionPhoto) errors.push("Uploadni fotku ne.");
      return errors;
    },
    newOrder() {
      const orders = this.sections.map((section) => section.order);
      return Math.max(...orders) + 1;
    },
  },
  methods: {
    resetForm() {
      this.showValidations = false;
      this.name = "";
      this.description = "";
      this.date = null;
      this.place = "";
      this.sectionPhoto = null;
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

          addSection({
            name: this.name,
            description: this.description,
            date: this.date,
            place: this.place,
            photos: [],
            storageRef: sectionStoragePath,
            sectionPhoto,
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
