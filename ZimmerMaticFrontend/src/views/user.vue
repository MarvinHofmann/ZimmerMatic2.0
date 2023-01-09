<template>
  <div>
    <navbardarkVue></navbardarkVue>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="card">
          <div class="card-header card-title" dash>
            <div class="float-start mt-1">Registrierte Benutzer</div>
            <div class="spinner-grow text-warning mx-2" role="status" style="width: 1.5rem; height: 1.5rem;" v-if="this.loading">
              <span class="visually-hidden">Loading...</span>
            </div>
            <button class="btn btn-outline-secondary btn-sm float-end" role="button" data-bs-toggle="modal" data-bs-target="#addUserModal">
              Nutzer hinzufügen
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
          <div class="modal-body">
            <form ref="AddUserRef">
              <div class="form-group row">
                <label for="nameInput" class="col-lg-2 col-form-label">Name</label>
                <div class="col-10">
                  <input class="form-control" type="text" v-model="this.userdata.name" id="nameInput" />
                </div>
              </div>

              <div class="form-group row">
                <label for="username" class="col-lg-2 col-form-label">Username</label>
                <div class="col-10">
                  <input class="form-control" type="text" v-model="this.userdata.username" id="username" />
                </div>
              </div>

              <div class="form-group row">
                <label for="roleInput" class="col-lg-2 col-form-label">Rolle</label>
                <div class="col-10">
                  <select class="form-select" id="roleInput" v-model="this.userdata.role">
                    <option>Admin</option>
                    <option>User</option>
                    <option>Gast</option>
                  </select>
                </div>
              </div>

              <div class="form-group row">
                <label for="pass" class="col-lg-2 col-form-label">Passwort</label>
                <div class="col-10">
                  <input class="form-control" type="password" v-model="this.userdata.password" id="pass" />
                </div>
              </div>

              <div class="form-group row">
                <label for="rep_pass" class="col-lg-2 col-form-label">Passwort wiederholen</label>
                <div class="col-10">
                  <input class="form-control" type="password" v-model="this.userdata.repeat_password" id="rep_pass" />
                </div>
              </div>
            </form>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="clear_form" data-bs-dismiss="modal">Abbrechen</button>
            <button type="button" class="btn btn-primary" @click="register" data-bs-dismiss="modal">Nutzer hinzufügen</button>
          </div>
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
import axios from "axios";
export default {
  components: {
    navbardarkVue,
    userTableBody,
    deleteModal,
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
      this.loading = false;
      console.log(res);
      this.fetch_user();
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
      console.log(res);
      this.fetch_user();
    },
    async set_user_to_delete(id) {
      this.user_to_delete = id;
    },
  },
  mounted() {
    this.fetch_user();
  },
};
</script>

<style scoped>
.row {
  margin-top: 1.5em;
}
</style>
