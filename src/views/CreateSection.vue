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
import InputBox from "../components/inputboxes/InputBox.vue";
import DatepickerBox from "../components/inputboxes/DatepickerBox.vue";
import { addSection } from "../store";

export default {
  name: "CreateSection",
  components: {
    InputBox,
    DatepickerBox,
  },
  data() {
    return {
      name: "",
      description: "",
      date: null,
      place: "",
      showValidations: false,
    };
  },
  computed: {
    errors() {
      const errors = [];
      if (this.name.length === 0) errors.push("Meno je povinný údaj.");
      if (!this.date) errors.push("Dátum je poivinný údaj");
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
    },
    async addSection() {
      try {
        if (this.errors.length === 0) {
          await addSection({
            name: this.name,
            description: this.description,
            date: this.date,
            place: this.place,
            photos: [],
            sliderPhoto: "",
          });
          this.resetForm();
        } else {
          this.showValidations = true;
        }
      } catch (err) {
        console.error(err);
      }
    },
  },
};
</script>
