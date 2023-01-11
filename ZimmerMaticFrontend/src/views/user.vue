<template>
  <div>
    <navbardarkVue></navbardarkVue>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <Transition>
          <div class="alert alert-danger" role="alert" v-if="this.danger.show">{{ this.danger.message }}</div>
        </Transition>
        <Transition>
          <div class="alert alert-success" role="alert" v-if="this.success.show">{{ this.success.message }}</div>
        </Transition>
        <div class="card">
          <div class="card-header card-title" dash>
            <div class="float-start mt-1">Registrierte Benutzer</div>
            <div class="spinner-grow text-warning mx-2" role="status" style="width: 1.5rem; height: 1.5rem" v-if="this.loading">
              <span class="visually-hidden">Loading...</span>
            </div>
            <button
              class="btn btn-outline-secondary btn-sm float-end d-none d-lg-block .d-xl-block .d-xxl-block"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
            >
              Nutzer hinzufügen
            </button>
            <button
              class="btn btn-outline-secondary btn-sm float-end d-lg-none d-xl-none d-xxl-none"
              role="button"
              data-bs-toggle="modal"
              data-bs-target="#addUserModal"
            >
              <i class="bi bi-person-add"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-lg-12">
                <div class="table-responsive">
                  <table class="table align-middle">
                    <thead>
                      <tr>
                        <th style="width: 20%" scope="col">ID</th>
                        <th style="width: 20%" scope="col">Benutzername</th>
                        <th style="width: 20%" scope="col">Name</th>
                        <th style="width: 20%" scope="col">Rolle</th>
                        <th style="width: 20%" scope="col">Aktionen</th>
                      </tr>
                    </thead>
                    <tbody>
                      <userTableBody
                        v-for="item in this.users"
                        :username="item.username"
                        :name="item.name"
                        :role="item.role"
                        :id="item._id"
                        @delete_user="set_user_to_delete"
                        @update_user="update_user"
                      ></userTableBody>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <div class="modal fade modal-lg" id="addUserModal" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addUserLabel">Neuen Benutzer hinzufügen</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <form ref="AddUserRef" @submit.prevent="onSubmit">
            <div class="modal-body">
              <div class="form-group row">
                <label for="nameInput" class="col-lg-2 col-form-label">Name</label>
                <div class="col-10">
                  <input
                    class="form-control"
                    type="text"
                    v-model="v$.userdata.name.$model"
                    id="nameInput"
                    :class="{ 'is-invalid': v$.userdata.name.$error }"
                  />
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.name.$error">Bitte geben Sie einen Namen ein</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="username" class="col-lg-2 col-form-label">Username</label>
                <div class="col-10">
                  <input
                    class="form-control"
                    type="text"
                    v-model="v$.userdata.username.$model"
                    id="username"
                    :class="{ 'is-invalid': v$.userdata.username.$error }"
                  />
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.username.$error">Der Username darf nicht kürzer als 3 Zeichen sein</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="roleInput" class="col-lg-2 col-form-label">Rolle</label>
                <div class="col-10">
                  <select class="form-select" id="roleInput" v-model="v$.userdata.role.$model" :class="{ 'is-invalid': v$.userdata.role.$error }">
                    <option>Admin</option>
                    <option>User</option>
                    <option>Gast</option>
                  </select>
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.role.$error">Bitte geben Sie eine Rolle an</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="pass" class="col-lg-2 col-form-label">Passwort</label>
                <div class="col-10">
                  <input
                    class="form-control"
                    type="password"
                    v-model="this.userdata.password"
                    id="pass"
                    :class="{ 'is-invalid': v$.userdata.password.$error }"
                  />
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.password.$error">Bitte geben Sie ein 6 stelliges Passwort ein</div>
                </div>
              </div>

              <div class="form-group row">
                <label for="rep_pass" class="col-lg-2 col-form-label">Passwort wiederholen</label>
                <div class="col-10">
                  <input
                    class="form-control"
                    type="password"
                    v-model="this.userdata.repeat_password"
                    id="rep_pass"
                    :class="{ 'is-invalid': v$.userdata.repeat_password.$error }"
                    @blur="v$.userdata.repeat_password.$touch"
                  />
                  <!-- error message -->
                  <div class="text-danger" v-if="v$.userdata.repeat_password.$error">Die beiden Passwörter stimmen nicht überein</div>
                </div>
              </div>
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="clear_form" data-bs-dismiss="modal">Abbrechen</button>
              <button class="btn btn-primary" type="submit" :disabled="v$.userdata.$invalid" @click="register" data-bs-dismiss="modal">
                Nutzer hinzufügen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <deleteModal id="DeleteCam" :delete_item="this.user_to_delete" @delete_answer="delete_request"></deleteModal>
  </div>
</template>

<script>
import navbardarkVue from "../components/navbardark.vue";
import userTableBody from "../components/userTableBody.vue";
import deleteModal from "../components/deleteModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required, sameAs, minLength } from "@vuelidate/validators";
import axios from "axios";
export default {
  components: {
    navbardarkVue,
    userTableBody,
    deleteModal,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      users: [],
      userdata: {
        name: "",
        username: "",
        role: "",
        password: "",
        repeat_password: "",
      },
      user_to_delete: "",
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
    async fetch_user() {
      console.log("user");
      this.users = await axios.get("http://zimmermatic:3443/api/user/getAllUser").then((response) => response.data);
    },
    async register() {
      this.loading = true;
      let res = await axios
        .post("http://zimmermatic:3443/api/user/register", {
          username: this.userdata.username,
          password: this.userdata.password,
          name: this.userdata.name,
          role: this.userdata.role,
        })
        .then((response) => response.data);
      this.fetch_user();
      this.clear_form();
      this.loading = false;
      if (res == "Successful Added User") {
        this.success.message = "Der Benutzer " + this.userdata.username + " wurde erfolgreich angelegt.";
        this.success.show = true;
        setTimeout(() => (this.success.show = false), 2000);
      } else {
        this.danger.message = "Der Nutzer konnte nicht angelegt werden";
        this.danger.show = true;
        setTimeout(() => (this.danger.show = false), 20000);
      }
    },
    clear_form() {
      this.$refs.AddUserRef.reset();
    },
    delete_request(request_bool) {
      if (request_bool) {
        this.delete_user(this.user_to_delete);
      }
    },
    async delete_user(id) {
      this.loading = true;
      let res = await axios
        .post("http://zimmermatic:3443/api/user/delete", {
          id: id,
        })
        .then((response) => response.data);
      this.loading = false;
      this.fetch_user();
    },
    async set_user_to_delete(id) {
      this.user_to_delete = id;
    },
    async update_user(new_user_data, id) {
      this.loading = true;
      let res = await axios
        .post("http://zimmermatic:3443/api/user/update", {
          id: id,
          username: new_user_data.username,
          name: new_user_data.name,
        })
        .then((response) => response.data);
      this.loading = false;
      if (res.modifiedCount == 1 && res.matchedCount == 1) {
        this.success.message = "Der Nutzer wurde erfolgreich geändert";
        this.success.show = true;
        setTimeout(() => (this.success.show = false), 2000);
      } else {
        this.danger.message = "Der Nutzer konnte nicht geändert werden";
        this.danger.show = true;
        setTimeout(() => (this.danger.show = false), 2000);
      }
      this.fetch_user();
    },
  },
  mounted() {
    this.fetch_user();
  },
  validations() {
    return {
      userdata: {
        name: { required },
        username: { required, minLength: minLength(3) },
        role: { required },
        password: { required, minLength: minLength(6) },
        repeat_password: { required, sameaspass: sameAs(this.userdata.password) },
      },
    };
  },
};
</script>

<style scoped>
.row {
  margin-top: 1.5em;
}
</style>
