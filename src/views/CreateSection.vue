<template>
  <main>
    <h1>Nová sekcia</h1>

    <!-- Názov sekcie -->
    <input-box
      v-model="name"
      :attrs="{
        placeholder: 'Názov sekcie',
      }"
    ></input-box>

    <!-- Dátum -->
    <datepicker-box
      v-model="date"
      :attrs="{
        placeholder: 'Dátum',
      }"
    ></datepicker-box>

    <!-- Popis -->
    <input-box
      v-model="description"
      :attrs="{
        placeholder: 'Popis ...',
      }"
    ></input-box>

    <!-- Miesto -->
    <input-box
      v-model="place"
      :attrs="{
        placeholder: 'Miesto',
      }"
    ></input-box>

    <!-- Fotografia 1 -->
    <file-box
      v-model="sliderPhoto"
    ></file-box>

    <ul v-if="showValidations">
      <li
        v-for="(error, index) in errors"
        :key="index + 1"
      >{{error}}</li>
    </ul>

    <button @click="addSection">Vytvoriť sekciu</button>
  </main>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import InputBox from "../components/inputboxes/InputBox.vue";
import FileBox from "../components/inputboxes/FileBox.vue";
import DatepickerBox from "../components/inputboxes/DatepickerBox.vue";
import { getters, addSection, uploadFile } from "../store";
import { removeDiacritics } from "../utils/string";

export default {
  name: "CreateSection",
  components: {
    InputBox,
    DatepickerBox,
    FileBox,
  },
  data() {
    return {
      name: "",
      description: "",
      date: null,
      place: "",
      showValidations: false,
      sliderPhoto: null,
    };
  },
  computed: {
    ...getters,
    errors() {
      const errors = [];
      if (this.name.length === 0) errors.push("Meno je povinný údaj.");
      if (!this.date) errors.push("Dátum je poivinný údaj.");
      if (!this.sliderPhoto) errors.push("Uploadnite slider fotografie.");
      return errors;
    },
  },
  methods: {
    resetForm() {
      this.showValidations = false;
      this.name = "";
      this.description = "";
      this.date = null;
      this.place = "";
      this.sliderPhoto = null;
    },
    async addSection() {
      try {
        if (this.errors.length === 0) {
          this.store.loadingText = "Čekaj uploadujem fotku...";
          const sectionStoragePath = `${removeDiacritics(this.name).split(" ").join("_")}_${uuidv1()}`;
          const sliderPhoto = await uploadFile(
            `${sectionStoragePath}/${uuidv1()}`,
            this.sliderPhoto,
          );

          this.store.loadingText = "Teraz ukladám data do databázy ... ešči čekaj chvilku.";
          addSection({
            name: this.name,
            description: this.description,
            date: this.date,
            place: this.place,
            photos: [],
            storageRef: sectionStoragePath,
            sliderPhoto,
          });
          this.resetForm();
          this.store.loadingText = null;
        } else {
          this.showValidations = true;
        }
      } catch (err) {
        this.store.loadingText = null;
        console.error(err);
      }
    },
  },
  mounted() {
    this.loader.loadingProgress = 100;
  },
};
</script>
