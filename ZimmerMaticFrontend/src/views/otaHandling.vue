<template>
  <navbardark></navbardark>
  <main class="px-3 pt-3">
    <div class="container-fluid pt-3">
      <Transition>
        <uploadFileComp class="mt-3" v-if="this.upload" @update_table="update_table"></uploadFileComp>
      </Transition>
      <div class="row">
        <div class="card p-0 mt-3">
          <div class="card-header card-title" dash>
            <div class="float-start mt-1">OTA Geräte</div>
            <button class="btn btn-outline-secondary btn-sm float-end d-none d-lg-block .d-xl-block .d-xxl-block"
              role="button" data-bs-toggle="modal" data-bs-target="#addUserModal">
              Gerät hinzufügen
            </button>
            <button class="btn btn-outline-secondary btn-sm float-end d-lg-none d-xl-none d-xxl-none" role="button"
              data-bs-toggle="modal" data-bs-target="#addUserModal">
              <i class="bi bi-file-plus"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th style="width: 16.66%;" scope="col">ID</th>
                    <th style="width: 16.66%;" scope="col">ESP</th>
                    <th style="width: 16.66%;" scope="col">Standort</th>
                    <th style="width: 16.66%;" scope="col">Programm</th>
                    <th style="width: 16.66%;" scope="col">Version4</th>
                    <th style="width: 16.66%;" scope="col">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  <otaTable :id="'IDXY'" :esp="'ESP-82199'" :standort="'Table'" :programm="'programm_xy.bin'"
                    :version="'0.4'"></otaTable>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <!-- Zweite Tabelle  -->


        <div class="card p-0 mt-3">
          <div class="card-header card-title" dash>
            <div class="float-start mt-1">Hochgeladene Programme</div>
            <button class="btn btn-outline-secondary btn-sm float-end d-none d-lg-block .d-xl-block .d-xxl-block"
              role="button" @click="this.upload = !this.upload">
              .bin Datei hochladen
            </button>
            <button class="btn btn-outline-secondary btn-sm float-end d-lg-none d-xl-none d-xxl-none" role="button"
              @click="this.upload = !this.upload">
              <i class="bi bi-file-earmark-plus-fill"></i>
            </button>
          </div>
          <div class="card-body">
            <div class="table-responsive">
              <table class="table align-middle">
                <thead>
                  <tr>
                    <th style="width: 40%;" scope="col">ID</th>
                    <th style="width: 20%;" scope="col">Programm</th>
                    <th style="width: 20%;" scope="col">Version4</th>
                    <th style="width: 20%;" scope="col">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  <otaFilesTableBody v-for="item in this.files" :id="item.id" :programm="item.filename"
                    :version="item.version"></otaFilesTableBody>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import uploadFileComp from "../components/upload_file.vue"
import navbardark from "../components/navbardark.vue";
import otaTable from "../components/otaTable.vue"
import { get_files } from "../services/ota";
import otaFilesTableBody from "../components/otaFilesTableBody.vue"
export default {
  components: {
    navbardark,
    otaTable,
    otaFilesTableBody,
    uploadFileComp
  },
  data() {
    return {
      files: [],
      upload: false
    };
  },
  methods: {
    async update_table(){
      setTimeout(() => (this.upload = false), 2000);
      this.files = await get_files().then(response => response.data)
    }
  },
  async mounted() {
    this.files = await get_files().then(response => response.data)
    console.log(this.files);
  }

};
</script>

<style scoped>

</style>
