<template>
  <tr>
    <th scope="row">{{this.id}}</th>
    <td>{{this.username}}</td>
    <td>{{this.name}}</td>
    <td>{{this.role}}</td>
    <td>
      <button @click="call_for_delete()" class="btn btn-outline-danger action bi bi-trash mx-1" data-bs-target="#DeleteCam" data-bs-toggle="modal" role="button"></button>
      <button @click="edit()" class="btn btn-outline-secondary action bi bi-pencil mx-1"></button>
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
    return {};
  },
  methods: {
    call_for_delete() {
      this.$emit("delete_user", this.id);
    },
  },
  mounted() {},
};
</script>

<style scoped></style>
