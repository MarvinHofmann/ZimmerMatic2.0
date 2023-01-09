<template>
  <main class="px-3 pt-5">
    <div class="container-fluid pt-5">
      <div class="row justify-content-center mt-5">
        <div class="col-lg-4 col-sm-6 col-md-6">
          <div class="d-flex justify-content-center">
            <img src="../../public/favicon.ico" alt="Logo" />
          </div>
          <div class="card mt-3">
            <div class="card-header">Login</div>
            <div class="card-body">
              <form @submit.prevent="onSubmit">
                <div class="mb-3">
                  <label for="email" class="form-label">Benutzername</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-person"></i></span>
                    <input
                      type="username"
                      class="form-control"
                      id="email"
                      placeholder=""
                      v-model="v$.form_login.username.$model"
                      :class="{ 'is-invalid': v$.form_login.username.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.form_login.username.$error">Username fehlt</div>
                </div>
                <div class="mb-3">
                  <label for="pass" class="form-label">Passwort</label>
                  <div class="input-group">
                    <span class="input-group-text"><i class="bi bi-key"></i></span>
                    <input
                      type="password"
                      class="form-control"
                      id="pass"
                      v-model="v$.form_login.password.$model"
                      :class="{ 'is-invalid': v$.form_login.password.$error }"
                    />
                  </div>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.form_login.password.$error">Passwort fehlt</div>
                </div>
                <div class="text-center">
                  <div class="spinner-border text-primary mt-2" role="status" v-if="this.loading">
                    <span class="visually-hidden">Loading...</span>
                  </div>
                </div>
                <div v-if="this.error_text != ''" class="alert alert-danger" role="alert">{{ this.error_text }}</div>
                <button
                  href="#"
                  type="submit"
                  role="button"
                  class="btn btn-outline-primary float-end"
                  @click="sign_in()"
                  v-if="!this.loading"
                  :disabled="v$.form_login.$invalid"
                >
                  Einloggen
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { useAuthStore } from "../stores/auth.store";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
export default {
  components: {
    userStore: null,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      form_login: {
        username: "",
        password: "",
      },
      error_text: "",
      loading: false,
    };
  },
  methods: {
    async sign_in() {
      this.loading = true;
      this.error_text = "";
      this.userStore = useAuthStore();
      let res = await this.userStore.login(this.form_login.username, this.form_login.password);
      this.loading = false;
      if (res.status == "failed") {
        this.error_text = res.error;
        console.log(res.error);
      } else {
        this.$router.push("/");
      }
    },
  },
  validations() {
    return {
      form_login: {
        username: { required },
        password: { required },
      },
    };
  },
};
</script>

<style scoped>
</style>
