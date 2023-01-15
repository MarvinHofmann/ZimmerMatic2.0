<template>
  <tr>
    <th scope="row">{{ this.id }}</th>
    <td>{{ this.programm }}</td>
    <td>{{ this.version }}</td>
    <td>
      <button
        @click="call_for_delete()"
        class="btn btn-outline-danger action bi bi-trash mx-1"
        role="button"
      ></button>
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
  },
  mounted() {},
};
</script>
<style scoped></style>
