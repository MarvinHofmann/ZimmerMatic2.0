<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row justify-content-md-center">
          <div class="col-lg-9">
            <div class="card shadow">
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-3 border-right">
                    <div class="p-3">
                      <div class="img-circle text-center mb-3">
                        <img
                          src="https://robohash.org/7ae5b4a9231acc4c57593f4114870365?set=set4&bgset=&size=500x500"
                          alt="mdo"
                          width="100"
                          height="100"
                          class="rounded-circle"
                        />
                      </div>
                      <h4 class="text-center mb-0">{{ this.store.user.username }}</h4>
                      <p class="text-center text-muted my-0 company">{{ this.store.user.role }}</p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <a class="list-group-item ms-3 active" data-bs-toggle="collapse" role="button"> Passwort </a>
                    </ul>
                  </div>
                  <div class="col-lg-9" id="allgemein">
                    <h1 class="display-3">Passwort</h1>
                    <form @submit.prevent="onSubmit" ref="changepw">
                      <label for="cur_pass" class="form-label">Bisheriges Passwort</label>
                      <input
                        type="password"
                        class="form-control"
                        id="cur_pass"
                        v-model="this.form_password.old_pass"
                        @blur="v$.form_password.old_pass.$touch"
                        :class="{ 'is-invalid': v$.form_password.old_pass.$error }"
                      />
                      <!-- error message -->
                      <div class="text-danger" v-if="v$.form_password.old_pass.$error">Bitte geben Sie das aktuelle Passwort ein</div>

                      <label for="new_pass" class="form-label mt-3">Neues Passwort</label>
                      <input
                        type="password"
                        class="form-control"
                        id="new_pass"
                        v-model="this.form_password.new_pass"
                        @blur="v$.form_password.new_pass.$touch"
                        :class="{ 'is-invalid': v$.form_password.rep_pass.$error }"
                      />
                      <!-- error message -->
                      <div class="text-danger" v-if="v$.form_password.rep_pass.$error">Die beiden Passwörter stimmen nicht überein</div>

                      <label for="rep_new_pass" class="form-label mt-3">Passwort Wiederholen</label>
                      <input
                        type="password"
                        class="form-control"
                        id="rep_new_pass"
                        v-model="this.form_password.rep_pass"
                        @blur="v$.form_password.rep_pass.$touch"
                        :class="{ 'is-invalid': v$.form_password.rep_pass.$error }"
                      />
                      <!-- error message -->
                      <div class="text-danger" v-if="v$.form_password.rep_pass.$error">Die beiden Passwörter stimmen nicht überein</div>
                    </form>
                    <Transition>
                      <div class="alert alert-danger mt-2" role="alert" v-if="this.danger.show">{{ this.danger.message }}</div>
                    </Transition>
                    <Transition>
                      <div class="alert alert-success mt-2" role="alert" v-if="this.success.show">{{ this.success.message }}</div>
                    </Transition>
                    <button
                      class="btn btn-primary mt-3 float-end"
                      type="submit"
                      :disabled="v$.form_password.$invalid || this.loading"
                      @click="new_password"
                    >
                      <span v-if="this.loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Neues Passwort Anfordern
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import navbardark from "../components/navbardark.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs } from "@vuelidate/validators";
import { useAuthStore } from "../stores/auth.store";
import { change_user_password } from "../services/userdataAPI";

export default {
  setup() {
    const store = useAuthStore();
    return { v$: useVuelidate(), store };
  },
  components: {
    navbardark,
  },
  data() {
    return {
      form_password: {
        old_pass: "",
        new_pass: "",
        rep_pass: "",
      },
      loading: false,
      danger: {
        show: false,
        message: "",
      },
      success: {
        show: false,
        message: "",
      },
    };
  },
  methods: {
    async new_password() {
      this.loading = true;
      let res = await change_user_password(this.store.user.username, this.form_password.old_pass, this.form_password.new_pass);
      this.loading = false;
      this.v$.$reset();
      const initialData = this.$options.data.call(this);
      Object.assign(this.$data, initialData);
      if (res.modifiedCount == 1 && res.matchedCount == 1) {
        this.success.message = "Das Passwort wurde erfolgreich geändert";
        this.success.show = true;
        setTimeout(() => (this.success.show = false), 2000);
      } else {
        this.danger.message = "Das Passwort konnte nicht geändert werden";
        this.danger.show = true;
        setTimeout(() => (this.danger.show = false), 2000);
      }
    },
  },
  validations() {
    return {
      form_password: {
        old_pass: { required },
        new_pass: { required },
        rep_pass: { required, sameaspass: sameAs(this.form_password.new_pass) },
      },
    };
  },
  mounted() {},
};
</script>

<style scoped>
.company {
  font-size: 14px;
  font-weight: 200;
}
.display-6 {
  color: var(--detagto-dark-blue);
}
.list-group {
  margin: 0;
}
.form-group {
  padding: 3px;
}
.border-right {
  border-right: 1px solid #dee2e6 !important;
}
</style>
