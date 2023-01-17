<template>
  <tr>
    <th scope="row">{{ this.id }}</th>
    <td>{{ this.programm }}</td>
    <td>{{ this.version }}</td>
    <td>
      <button @click="call_for_delete()" class="btn btn-outline-danger action bi bi-trash mx-1" role="button"></button>
      <button @click="call_for_flash()" class="btn btn-outline-success bi bi-upload" role="button" data-bs-target="#flashModal" data-bs-toggle="modal"></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["id", "programm", "version"],
  components: {},
  data() {
    return {};
  },
  methods: {
    call_for_delete() {
      this.$emit("delete", { id: this.id, programm: this.programm, version: this.version });
    },
    call_for_flash(){
      this.$emit('flash', this.programm)
    }
  },
  mounted() {},
};
</script>
<style scoped></style>
