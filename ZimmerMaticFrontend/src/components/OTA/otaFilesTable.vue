<template>
  <transitionAlert ref="alert" :message="this.alert.message" :ttl="5000"></transitionAlert>
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
              <th style="width: 30%" scope="col">ID</th>
              <th style="width: 21%" scope="col">Programm</th>
              <th style="width: 21%" scope="col">Version</th>
              <th style="width: 15%" scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <otaFilesTableBody @delete="deleteFile" v-for="item in this.files" :id="item.id" :programm="item.filename" :version="item.version"></otaFilesTableBody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import transitionAlert from "../transitionAlert.vue";
import uploadFileComp from "./upload_file.vue";
import { get_files, delete_file } from "../../services/ota";
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
        message: "",
      },
    };
  },
  methods: {
    async deleteFile(file_information){
      await delete_file(file_information).then((response) =>
        response.error != true ? this.update_table() : ((this.alert.message = "Fehler beim löschen des Programms"), this.$refs.alert.show_alert())
      );
    },
    async update_table() {
      await get_files().then((response) =>
        response != "Error" ? (this.files = response) : ((this.alert.message = "Fehler beim laden der Programme"), this.$refs.alert.show_alert())
      );
    },
  },
  async mounted() {
    this.update_table()
  },
};
</script>

<style scoped></style>
