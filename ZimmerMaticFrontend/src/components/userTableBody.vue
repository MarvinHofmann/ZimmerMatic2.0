<template>
  <tr>
    <th scope="row">{{ this.id }}</th>
    <td v-if="!this.edit">{{ this.username }}</td>
    <td v-if="!this.edit">{{ this.name }}</td>
    <td v-if="this.edit"><input class="form-control" type="text" v-model="this.edit_form.username" /></td>
    <td v-if="this.edit"><input class="form-control" type="text" v-model="this.edit_form.name" /></td>
    <td>{{ this.role }}</td>
    <td>
      <button
        @click="call_for_delete()"
        class="btn btn-outline-danger action bi bi-trash mx-1"
        data-bs-target="#DeleteCam"
        data-bs-toggle="modal"
        role="button"
      ></button>
      <button v-if="!this.edit" @click="edit_user()" class="btn btn-outline-secondary action bi bi-pencil mx-1"></button>
      <button v-else @click="save_user()" class="btn btn-outline-success action bi bi-check-lg mx-1"></button>
    </td>
  </tr>
</template>

<script>
import navbardarkVue from "../components/navbardark.vue";
export default {
  props: ["id", "username", "name", "role"],
  components: {
    navbardarkVue,
  },
  data() {
    return {
      edit: false,
      edit_form: {
        username: "",
        name: "",
      },
    };
  },
  methods: {
    call_for_delete() {
      this.$emit("delete_user", this.id);
    },
    edit_user() {
      this.edit_form.username = this.username;
      this.edit_form.name = this.name;
      this.edit = true;
    },
    save_user() {
      this.edit = false;
      if (this.edit_form.username != this.username || this.edit_form.name != this.name) {
        this.$emit("update_user", this.edit_form, this.id);
      }
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
