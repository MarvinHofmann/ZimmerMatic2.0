<template>
  <transitionAlert
    :show="this.alert.visible"
    :message="this.alert.message"
    :type="this.alert.type"
    @done="this.alert.visible = false"
    :ttl="this.alert.ttl"
  ></transitionAlert>
  <Transition>
    <uploadFileComp class="mt-3" v-if="this.upload" @update_table="update_table"></uploadFileComp>
  </Transition>
  <div class="card p-0 mt-3">
    <div class="card-header card-title" dash>
      <div class="float-start mt-1">Hochgeladene Programme</div>
      <button
        class="btn btn-outline-secondary btn-sm float-end d-none d-lg-block .d-xl-block .d-xxl-block"
        role="button"
        @click="this.upload = !this.upload"
      >
        .bin Datei hochladen
      </button>
      <button class="btn btn-outline-secondary btn-sm float-end d-lg-none d-xl-none d-xxl-none" role="button" @click="this.upload = !this.upload">
        <i class="bi bi-file-earmark-plus-fill"></i>
      </button>
    </div>
    <div class="card-body">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th style="width: 40%" scope="col">ID</th>
              <th style="width: 20%" scope="col">Programm</th>
              <th style="width: 20%" scope="col">Version4</th>
              <th style="width: 20%" scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <otaFilesTableBody v-for="item in this.files" :id="item.id" :programm="item.filename" :version="item.version"></otaFilesTableBody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import transitionAlert from "../transitionAlert.vue";
import uploadFileComp from "./upload_file.vue";
import { get_files } from "../../services/ota";
import otaFilesTableBody from "./otaFilesTableBody.vue";
export default {
  components: {
    otaFilesTableBody,
    uploadFileComp,
    transitionAlert,
  },
  data() {
    return {
      files: [],
      upload: false,
      alert: {
        visible: false,
        ttl: 2000,
        message: "",
        type: "",
      },
    };
  },
  methods: {
    async update_table() {
      setTimeout(() => (this.upload = false), 2000);
      this.files = await get_files();
    },
  },
  async mounted() {
    let file_load =
      (await get_files()) != "Error"
        ? (this.files = file_load)
        : (this.alert = {
            visible: true,
            ttl: 5000,
            message: "Fehler beim laden der Programme",
            type: "danger",
          });
    console.log(this.files);
  },
};
</script>

<style scoped></style>
