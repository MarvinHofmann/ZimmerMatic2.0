<template>
  <div class="card p-0 mt-3">
    <div class="card-header card-title">
      <div class="float-start mt-1">OTA Geräte</div>
      <button
        class="btn btn-outline-secondary btn-sm float-end d-none d-lg-block .d-xl-block .d-xxl-block"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#addUserModal"
      >
        Gerät hinzufügen
      </button>
      <button
        class="btn btn-outline-secondary btn-sm float-end d-lg-none d-xl-none d-xxl-none"
        role="button"
        data-bs-toggle="modal"
        data-bs-target="#addUserModal"
      >
        <i class="bi bi-file-plus"></i>
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th style="width: 16.66%" scope="col">ID</th>
              <th style="width: 16.66%" scope="col">ESP</th>
              <th style="width: 16.66%" scope="col">Standort</th>
              <th style="width: 16.66%" scope="col">Programm</th>
              <th style="width: 16.66%" scope="col">Version4</th>
              <th style="width: 16.66%" scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <otaTableBodyESP :id="'IDXY'" :esp="'ESP-82199'" :standort="'Table'" :programm="'programm_xy.bin'" :version="'0.4'"></otaTableBodyESP>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import otaTableBodyESP from "./otaTableBodyESP.vue";
export default {
  components: {
    otaTableBodyESP,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped></style>
