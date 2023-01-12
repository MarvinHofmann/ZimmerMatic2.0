<template>
  <main class="px-3 pt-5">
    <div class="container-fluid pt-5">
      <div class="input-group mb-3">
        <input type="file" class="form-control" id="inputGroupFile02" @change="onFileChange" />
        <button class="btn btn-outline-success" type="button" @click="onUploadFile" :disabled="!this.selectedFile">Upload</button>
      </div>
      <div class="progress">
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
  </main>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      progress: 10,
      selectedFile: "",
    };
  },
  methods: {
    onFileChange(e) {
      const selectedFile = e.target.files[0];
      this.selectedFile = selectedFile;
      this.progress = 0;
    },
    onUploadFile() {
        console.log("Upload", this.selectedFile);
    }
  },
};
</script>

<style scoped></style>
