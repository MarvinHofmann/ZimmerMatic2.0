<template>
    <div>
        <Transition>
            <div class="alert alert-danger" role="alert" v-if="this.danger.show">{{ this.message }}</div>
        </Transition>
        <Transition>
            <div class="alert alert-success" role="alert" v-if="this.success.show">{{ this.message }}</div>
        </Transition>
        <div class="input-group mb-3">
            <input type="file" class="form-control" ref="file" id="inputGroupFile02" @change="onFileChange" />
            <button class="btn btn-outline-success" type="button" @click="onUploadFile"
                :disabled="!this.selectedFile">Upload</button>
        </div>
        <div class="progress" v-if="this.progress != 0">
            <div class="progress-bar" role="progressbar" v-bind:style="{ width: this.progress + '%' }"
                v-bind:aria-valuenow="this.progress" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
const IP = import.meta.env.VITE_SERVER_IP;
export default {
    components: {
    },
    data() {
        return {
            progress: 0,
            selectedFile: "",
            danger: {
                show: false,
            },
            success: {
                show: false,
            },
            message: "",
        };
    },
    methods: {
        onFileChange(e) {
            const selectedFile = e.target.files[0];
            this.selectedFile = selectedFile;
        },
        async onUploadFile() {
            this.progress = 1
            const config = {
                onUploadProgress: event => {
                    this.progress = Math.round(
                        (event.loaded * 100) / event.total
                    );
                },
            }
            const formData = new FormData();
            formData.append("file", this.selectedFile)
            try {
                let res_back = await axios.post(IP + "/api/firmware/upload", formData, config).then(response => response)
                if (res_back.status == 200) {
                    this.message = res_back.data
                    this.success.show = true
                    setTimeout(() => (this.success.show = false), 2000);
                } else {
                    throw new Error("Fehler beim Hochladen")
                }
            } catch (error) {
                this.danger.show = true
                this.message = "Fehler beim Hochladen "
                setTimeout(() => (this.danger.show = false), 2000);
            }
            setTimeout(() => (this.progress = 0), 1000);
            this.$emit("update_table")
        }
    },
}
</script>