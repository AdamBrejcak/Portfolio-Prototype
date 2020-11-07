<template>
  <div>
    <h3>Šablóna {{activeTemplateIndex + 1}}</h3>

    <radio-box
      v-model="responsive"
      :options="[
        { label: 'Desktop', value: false },
        { label: 'Mobil', value: true },
      ]"
    ></radio-box>

    <div
      class="input-block"
      v-if="!responsive"
    >
      <update-photo
        v-for="(photo, index) in template.photos"
        :section="section"
        :key="index + 1"
        :index="index"
        :photo="photo"
        :template="template"
      ></update-photo>

      <number-box
        v-model="template.ratio"
        placeholder="Pomer strán"
        class="input-box--white"
      >
        <template slot="label">Pomer strán</template>
      </number-box>

      <button
        class="small-button"
        v-pointer
        @click="addPhoto"
      >Pridať fotografiu</button>
    </div>

    <div
      class="input-block"
      v-if="responsive"
    >
      <update-photo
        v-for="(photo, index) in template.responsivePhotos"
        :section="section"
        :key="index + 1"
        :index="index"
        :photo="photo"
        :template="template"
      ></update-photo>

      <number-box
        v-model="template.responsiveRatio"
        placeholder="Pomer strán"
        class="input-box--white"
      >
        <template slot="label">Pomer strán</template>
      </number-box>

      <button
        class="small-button"
        v-pointer
        @click="addResponsivePhoto"
      >Pridať fotografiu</button>
    </div>

    <div>
      <button
        class="small-button"
        style="margin-right: 10px"
        v-pointer
        @click="saveSection"
      >Uložiť</button>

      <button
        class="red-button small-button"
        v-pointer
        @click="$emit('remove')"
      >Vymazať šablónu</button>
    </div>

    <mini-loader v-if="loading"></mini-loader>
  </div>
</template>

<script>
import DB from "../firebaseInit";
import UpdatePhoto from "./UpdatePhoto.vue";
import MiniLoader from "./MiniLoader.vue";
import NumberBox from "./inputboxes/NumberBox.vue";
import RadioBox from "./inputboxes/RadioBox.vue";
import { getters } from "../store/index";

export default {
  name: "UpdateTemplate",
  components: {
    UpdatePhoto,
    MiniLoader,
    NumberBox,
    RadioBox,
  },
  props: [
    "template",
    "section",
    "activeTemplateIndex",
  ],
  data() {
    return {
      loading: false,
      responsive: false,
    };
  },
  computed: {
    ...getters,
  },
  mounted() {
    console.log(this.section);
  },
  methods: {
    addPhoto() {
      this.template.photos.push({
        rowStart: 1,
        rowEnd: 1,
        columnStart: 1,
        columnEnd: 1,
        photoURL: "",
      });
    },
    addResponsivePhoto() {
      this.template.responsivePhotos.push({
        rowStart: 1,
        rowEnd: 1,
        columnStart: 1,
        columnEnd: 1,
        photoURL: "",
      });
    },
    async saveSection() {
      try {
        this.loading = true;

        const request = JSON.parse(JSON.stringify(this.section));
        const { id } = request;
        const editedRequest = request;
        editedRequest.id = undefined;
        delete editedRequest.id;

        await DB
          .collection("section")
          .doc(id)
          .set(request);

        this.$emit("hide");
        this.loading = false;
      } catch (err) {
        alert(err);
      }
    },
  },
  watch: {
    responsive(bool) {
      this.store.enableMobileEditing = bool;
    },
  },
};
</script>
