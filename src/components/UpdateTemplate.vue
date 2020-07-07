<template>
  <div>
    <h3>Šablóna</h3>

    <update-photo
      v-for="(photo, index) in template.photos"
      :key="index + 1"
      :index="index"
      :photo="photo"
    ></update-photo>

    <button
      class="small-button"
      v-pointer
      @click="addPhoto"
    >Pridať fotografiu</button>

    <div>
      <button
        class="small-button"
        v-pointer
        style="margin-right: 10px"
      >Uložiť</button>

      <button
        class="red-button small-button"
        v-pointer
      >Vymazať</button>
    </div>
  </div>
</template>

<script>
import UpdatePhoto from "./UpdatePhoto.vue";

export default {
  name: "UpdateTemplate",
  components: {
    UpdatePhoto,
  },
  props: [
    "template",
  ],
  data() {
    return {
      x: "1",
    };
  },
  methods: {
    addPhoto() {
      this.template.photos.push({
        rowStart: 1,
        rowEnd: 1,
        columnStart: 1,
        columnEnd: 1,
      });
    },
  },
};
</script>
