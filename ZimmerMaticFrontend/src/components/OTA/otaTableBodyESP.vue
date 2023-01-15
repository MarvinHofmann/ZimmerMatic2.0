<template>
  <tr>
    <th scope="row">{{ this.id }}</th>
    <td>{{ this.esp }}</td>
    <td>{{ this.standort }}</td>
    <td>{{ this.programm }}</td>
    <td>{{ this.version }}</td>
    <td>
      <button @click="call_for_delete()" class="btn btn-outline-danger action bi bi-trash mx-1" role="button"></button>
    </td>
  </tr>
</template>

<script>
export default {
  props: ["id", "esp", "programm", "version", "standort"],
  components: {},
  data() {
    return {};
  },
  methods: {},
  mounted() {},
};
</script>
<style scoped></style>
