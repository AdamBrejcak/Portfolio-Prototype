<template>
  <main>
    <div>
      <button @click="downloadFile()"></button>
    </div>
  </main>
</template>

<script>
// import DB from "../firebaseInit";
import firebase from "firebase";
import { getters } from "../store";

export default {
  name: "All",
  computed: {
    ...getters,
  },
  methods: {
    downloadFile() {
      const storage = firebase.storage();
      // const pathRef = storage.ref("Daniel_a_Monika/7cb80f00-aca5-11ea-903d-bd3d54865a8b.jpeg");
      const storageRef = storage.refFromURL("gs://deafeye-1539950687727.appspot.com/Daniel_a_Monika/7cb80f00-aca5-11ea-903d-bd3d54865a8b.jpeg");
      const starsRef = storageRef.child("Daniel_a_Monika/7cb80f00-aca5-11ea-903d-bd3d54865a8b.jpeg");
      console.log(starsRef.getDownloadURL());
    },
  },
};
</script>
<style lang="scss" scoped>
  button{
    width: 50px;
    height: 30px;
    background-color: aqua;
  }
</style>
