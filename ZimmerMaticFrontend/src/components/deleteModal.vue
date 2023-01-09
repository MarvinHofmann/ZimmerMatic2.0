<template>
  <div class="modal fade" tabindex="-1" id="deleteModal" aria-labelledby="DeleteModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Wollen Sie <i>{{ this.delete_item }}</i> wirklich Löschen?
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="DeleteModalLabel"></button>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" @click="delete_answer(false)" data-bs-dismiss="modal">Abbrechen</button>
          <button type="button" class="btn btn-danger" @click="delete_answer(true)" data-bs-dismiss="modal">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["delete_item"],
  components: {},
  data() {
    return {};
  },
  methods: {
    delete_answer(bool) {
      this.$emit("delete_answer", bool);
    },
  },
  mounted() {},
};
</script>
