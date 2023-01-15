<template>
  <div>
    <transitionAlert ref="alert" :message="this.message" :type="this.type"></transitionAlert>
    <div class="input-group mb-3">
      <input type="file" class="form-control" ref="file" accept=".bin" @change="onFileChange" />
      <button class="btn btn-outline-success" type="button" @click="onUploadFile" :disabled="!this.selectedFile">Upload</button>
    </div>
    <div class="progress" v-if="this.progress != 0">
      <div
        class="progress-bar"
        role="progressbar"
        v-bind:style="{ width: this.progress + '%' }"
        v-bind:aria-valuenow="this.progress"
        aria-valuemin="0"
        aria-valuemax="100"
      ></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import transitionAlert from "../transitionAlert.vue";
const IP = import.meta.env.VITE_SERVER_IP;
export default {
  components: {
    transitionAlert,
  },
  data() {
    return {
      progress: 0,
      selectedFile: null,
      type: "alert-danger",
      message: "",
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
      console.log(this.selectedFile);
      if (this.selectedFile.type != "application/octet-stream") {
        this.message = "Bei der ausgewählten Datei handelt es sich nicht um eine .bin Datei";
        this.$refs.alert.show_alert();
        this.selectedFile = null;
      }
    },
    async onUploadFile() {
      this.progress = 1;
      const config = {
        onUploadProgress: (event) => {
          this.progress = Math.round((event.loaded * 100) / event.total);
        },
      };
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      try {
        let res_back = await axios.post(IP + "/api/firmware/upload", formData, config).then((response) => response);
        if (res_back.status == 200) {
          this.type = "alert-success";
          this.message = "Fehler beim Hochladen der Datei";
          this.$refs.alert.show_alert();
        } else {
          throw new Error("Fehler beim Hochladen");
        }
      } catch (error) {
        this.message = "Die Datei wurde erfolgreich hochgeladen";
        this.$refs.alert.show_alert();
      }
      setTimeout(() => (this.progress = 0), 1000);
      this.$emit("update_table");
    },
  },
};
</script>
