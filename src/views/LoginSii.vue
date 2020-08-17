<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card v-if="!isLoading" class="pa-2" outlined width="500px">
          <v-form ref="form" lazy-validation>
            <v-text-field v-model="rut" label="RUT" required></v-text-field>

            <v-text-field v-model="clave" type="password" label="Password" required></v-text-field>

            <v-btn @click="onLogin">Login</v-btn>
          </v-form>
        </v-card>
        <v-progress-circular v-else indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { login } from "../services/sii";
export default {
  name: "login-sii",
  data: () => ({
    rut: null,
    clave: null,
    isLoading: false,
  }),
  methods: {
    async onLogin() {
      try {
        this.isLoading = true;
        const { data } = await login(this.rut, this.clave);
        console.log(data);
        localStorage.setItem("token", JSON.stringify(data.token));
        this.$router.push("/boleta");
      } catch (error) {
        console.error(error);
        this.isLoading = false;
      }
    },
  },
};
</script>
