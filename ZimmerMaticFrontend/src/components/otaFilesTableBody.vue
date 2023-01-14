<template>
  <tr>
    <th scope="row">{{ this.id }}</th>
    <td>{{ this.programm }}</td>
    <td>{{ this.version }}</td>
    <td>
      <button @click="call_for_delete()" class="btn btn-outline-danger action bi bi-trash mx-1"
        data-bs-target="#DeleteCam" data-bs-toggle="modal" role="button"></button>
      <button v-if="!this.edit" @click="edit_user()"
        class="btn btn-outline-secondary action bi bi-pencil mx-1"></button>
      <button v-else @click="save_user()" class="btn btn-outline-success action bi bi-check-lg mx-1"></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["id", "programm", "version"],
  components: {
  },
  data() {
    return {

    };
  },
  methods: {

  },
  mounted() { },
};
</script>
<style scoped>

</style>
