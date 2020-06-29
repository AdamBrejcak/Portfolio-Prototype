<template>
  <form class="login" @submit.prevent="login">
    <p v-if="error.length > 0">{{error}}</p>

    <input-box
      v-model="email"
      type="email"
      placeholder="email"
    >
      <template slot="label">Email</template>
    </input-box>

    <input-box
      v-model="password"
      type="password"
      placeholder="Heslo"
    >
      <template slot="label">Heslo</template>
    </input-box>

    <button v-pointer type="submit" class="white-hover">Prihlásiť sa</button>
  </form>
</template>

<script>
import firebase from "firebase";
import InputBox from "../components/inputboxes/InputBox.vue";
import { getters } from "../store";

export default {
  name: "Login",
  components: {
    InputBox,
  },
  data() {
    return {
      email: "",
      password: "",
      error: "",
    };
  },
  computed: {
    ...getters,
  },
  methods: {
    async login() {
      try {
        await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);

        this.store.isAuth = true;

        this.$router.push("/").catch(() => {});
      } catch (err) {
        console.log(err);
        this.error = err.message;
      }
    },
  },
  mounted() {
    this.loader.loadingProgress = 100;
  },
};
</script>
