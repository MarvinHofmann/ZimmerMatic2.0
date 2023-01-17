<template>
  <div class="modal fade" tabindex="-1" id="flashModal" aria-labelledby="flashESPModal" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">
            Auf welche Microcontroller wollen sie {{ this.programm }} aufspielen?
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="flashESPModal"></button>
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
export default {
  props: ["programm"],
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
