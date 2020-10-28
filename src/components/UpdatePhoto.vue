<template>
  <div class="photo-update">
    <h4>Fotografia {{index + 1}}
      <button @click="deleteImage" class="small-button">Zmazať</button>
    </h4>

    <range-box
      min="1"
      max="9"
      step="1"
      v-model="photo.rowStart"
    >
      <template slot="label">
         Začiatok Y
      </template>
    </range-box>

    <range-box
      min="1"
      max="9"
      step="1"
      v-model="photo.rowEnd"
    >
      <template slot="label">
        Koniec Y
      </template>
    </range-box>

    <range-box
      min="1"
      max="9"
      step="1"
      v-model="photo.columnStart"
    >
      <template slot="label">
        Začiatok x
      </template>
    </range-box>

    <range-box
      min="1"
      max="9"
      step="1"
      v-model="photo.columnEnd"
    >
      <template slot="label">
        Koniec X
      </template>
    </range-box>

    <file-box
      v-model="file"
    >
      <template slot="label">Upload*</template>
    </file-box>

    <div class="separator"></div>

    <mini-loader v-if="loading"></mini-loader>
  </div>
</template>

<script>
import { v1 as uuidv1 } from "uuid";
import { uploadFile } from "../store";
import RangeBox from "./inputboxes/RangeBox.vue";
import FileBox from "./inputboxes/FileBox.vue";
import MiniLoader from "./MiniLoader.vue";


export default {
  name: "UpdatePhoto",
  components: {
    RangeBox,
    FileBox,
    MiniLoader,
  },
  props: [
    "index",
    "photo",
    "section",
    "template",
  ],
  data() {
    return {
      file: null,
      loading: false,
    };
  },
  computed: {
    columnStart() { return this.photo.columnStart; },
    columnEnd() { return this.photo.columnEnd; },
    rowStart() { return this.photo.rowStart; },
    rowEnd() { return this.photo.rowEnd; },
  },
  watch: {
    async file(newFile) {
      try {
        this.loading = true;
        const path = `${this.section.storageRef}/${uuidv1()}`;
        this.photo.photoURL = await uploadFile(path, newFile);
        this.loading = false;
      } catch (err) {
        this.loading = false;
        alert(err);
      }
    },
    columnStart(value) {
      if (value > this.photo.columnEnd) this.photo.columnEnd = value;
    },
    rowStart(value) {
      if (value > this.photo.rowEnd) this.photo.rowEnd = value;
    },
    rowEnd(value) {
      if (value < this.photo.rowStart) this.photo.rowStart = value;
    },
    columnEnd(value) {
      if (value < this.photo.columnStart) this.photo.columnStart = value;
    },

  },
  methods: {
    deleteImage() {
      // console.log(this.template.photos[this.index]);
      this.template.photos.splice(this.index, 1);
    },
  },
};
</script>
<style lang="scss" scoped>
  .delete{
    width: 30px;
    height: 15px;
  }
</style>
