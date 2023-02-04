<template>
  <div class="modal fade" tabindex="-1" id="flashModal" aria-labelledby="flashESPModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Auf welchen Microcontroller wollen sie {{ this.programm }} aufspielen?</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="flashESPModal"></button>
        </div>
        <div class="modal-body">
        <select class="form-select" id="cam_select" v-model="this.selected_client">
            <option v-for="option in this.client_names">
              {{ option.position }}
            </option>
            <option disabled v-if="this.client_names.length == 0">Keine Kamera im System</option>
          </select>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="delete_answer" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Flashen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { get_clients } from "../../services/ota";

export default {
  props: ["programm"],
  components: {},
  data() {
    return {
      client_names: {},
      selected_client: ""
    };
  },
  methods: {
    delete_answer(bool) {
      this.$emit("delete_answer", bool);
    },
    async get_names() {
      this.client_names = await get_clients();
    },
  },
  mounted() {
    this.get_names()
  },
};
</script>
