<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-6">
      <cron-light v-model="value" @error="error = $event" :locale="'de'"></cron-light>
      <div class="mt-1 text-muted">Cron Expression: {{ value }}</div>
      <div class="form-check mt-1 ms-1 mb-1">
        <input class="form-check-input" type="checkbox" v-model="this.oneTimeJob" id="oneTimeJob">
        <label class="form-check-label" for="oneTimeJob">
          Einmaliger Task
        </label>
      </div>
      <div class="form-floating mt-1">
        <select :disabled="this.edit" class="form-select" v-model="this.selectedOption" placeholder="Choose" id="floatingSelect" aria-label="Floating label select example">
          <option v-for="option in this.actions" :value="option">
            {{ option }}
          </option>
          <option disabled v-if="this.actions.length == 0">Keine Aktion gespeichert</option>
        </select>
        <label for="floatingSelect">Aktion Wählen</label>
      </div>
      <div class="form-floating mt-3">
        <input :disabled="this.edit" type="text" class="form-control" id="floatingInput" v-model="this.jobName" placeholder="Name" />
        <label for="floatingInput">Name des Jobs</label>
      </div>
      <div class="ms-1 mt-1" v-if="this.selectedOption == 'LED'">
        <div class="form-check" v-for="led in this.leds">
          <input class="form-check-input" type="checkbox" v-model="this.selectedLEDs" :value="led.path" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            {{ led.name }}
          </label>
        </div>
        <input type="color" v-model="this.color" class="form-control form-control-color" id="exampleColorInput" title="Choose your color">
      </div>
      <div class="ms-1 mt-1" v-else-if="this.selectedOption == 'Rolladen'">
        <p class="mb-0 text-muted">Richtung</p>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="this.shutterOption" :value="'UP'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck0">
            Hoch
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="this.shutterOption" :value="'DOWN'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck0">
            Runter
          </label>
        </div>
        <p class="mb-0 text-muted">Rolladen</p>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="this.selectedShutter" :value="'ROLLADEN/stateBett'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck2">
            Bett
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="this.selectedShutter" :value="'ROLLADEN/stateSchreibtisch'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck2">
            Büro
          </label>
        </div>
      </div>
      <div class="ms-1 mt-1" v-else-if="this.selectedOption == 'Licht'">
        <div class="form-check" v-for="light in this.lights">
          <input class="form-check-input" type="checkbox" v-model="this.selectedLights" :value="light.path" :id="'defaultCheck1' + light.path">
          <label class="form-check-label" :for="'defaultCheck1' + light.path">
            {{ light.name }}
          </label>
        </div>
        <label for="sliderBright" class="form-label mt-2 mb-0">Helligkeit {{ this.lightBrightness }}%</label>
        <input type="range" min="0" max="100" v-model="this.lightBrightness" class="form-range" id="sliderBright">
        <label for="sliderTemp" class="form-label mb-0">Farbtemperatur {{ this.lightColor }}%</label>
        <input type="range" min="0" max="100" v-model="this.lightColor" class="form-range" id="sliderTemp">
      </div>
      <div v-if="this.showErrName" class="alert alert-danger mt-3 mb-0" role="alert">
        Fehler: EMELY:1 Es muss ein Name angegeben werden!
      </div>
      <button v-if="this.edit" class="btn w-100 btn-outline-warning mt-3" type="button" @click="generateNewJob()">Job Ändern</button>
      <button v-else class="btn w-100 btn-outline-success mt-3" type="button" @click="generateNewJob()">Job Anlegen</button>
    </div>
    <div class="col-lg-6 text-center">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th scope="col">Job Name</th>
              <th scope="col">
                <p class="mb-0">Cron Expression</p> <small class="text-muted">m/h/d/m/wd</small>
              </th>
              <th scope="col">Aktion</th>
              <th scope="col">Status</th>
              <th scope="col">Häufigkeit</th>
              <th scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.jobs" @click="this.clickedCronjob = item" class="cursor-pointer">
              <th data-bs-toggle="modal" data-bs-target="#cronInfoModal" scope="row">{{ item.jobName }}</th>
              <td data-bs-toggle="modal" data-bs-target="#cronInfoModal">{{ item.expression }}</td>
              <td data-bs-toggle="modal" data-bs-target="#cronInfoModal">{{ item.type }}</td>
              <td data-bs-toggle="modal" data-bs-target="#cronInfoModal">
                <span v-if="item.active" class="badge rounded-pill bg-success">Aktiv</span>
                <span v-else class="badge rounded-pill bg-danger">Inaktiv</span>
              </td>
              <td data-bs-toggle="modal" data-bs-target="#cronInfoModal">
                <span v-if="item.oneTimeJob" class="badge rounded-pill bg-warning">Einmalig</span>
                <span v-else class="badge rounded-pill bg-primary">Dauerhaft</span>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <button v-if="item.active" @click="this.deactivateJob(item.jobName)" class="btn btn-sm btn-outline-danger bi bi-power mx-2"></button>
                  <button v-else @click="this.activateJob(item.jobName)" class="btn btn-sm btn-outline-success bi bi-power mx-2"></button>
                  <button @click="this.setEdit(item)" class="btn btn-sm btn-outline-warning bi bi-pencil me-2"></button>
                  <button @click="this.jobToDelete = item.jobName" data-bs-target="#deleteModal" data-bs-toggle="modal" class="btn btn-sm btn-outline-danger bi bi-trash"></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <deleteModal id="deleteModal" class="mt-5" :delete_item="this.jobToDelete" @delete_answer="delete_request"></deleteModal>
  <cronInfoModal :cronjob="this.clickedCronjob"></cronInfoModal>
</template>

<script>
import axios from 'axios';
const IP = import.meta.env.VITE_SERVER_IP;
import deleteModal from "./deleteModal.vue"
import cronInfoModal from './cronInfoModal.vue';
export default {
  components: {
    deleteModal,
    cronInfoModal
  },
  data() {
    return {
      jobName: "",
      selectedOption: null,
      selectedLEDs: [],
      color: "#d4520c",
      value: "* * * * *",
      error: "",
      actions: ["LED", "Rolladen", "Licht"],
      leds: [
        { name: "Kamin", path: "LED_COLOR/colorKamin" },
        { name: "Couch", path: "LED_COLOR/colorCouch" },
        { name: "Uhr", path: "LED_COLOR/colorUhr" },
        { name: "Marvin", path: "LED_COLOR/colorMarvin" },
        { name: "Emely", path: "LED_COLOR/colorEmely" },
      ],
      lights: [
        { name: "Bett Links", path: "BL" },
        { name: "Bett Rechts", path: "BR" },
        { name: "Basteltisch", path: "BT" }
      ],
      jobs: [],
      shutterOption: 'UP',
      selectedShutter: 'ROLLADEN/stateBett',
      jobToDelete: "",
      selectedLights: [],
      lightBrightness: 50,
      lightColor: 50,
      showErrName: false,
      oneTimeJob: false,
      clickedCronjob: {},
      edit: false,
    };
  },
  methods: {
    async generateNewJob() {
      if (this.selectedOption == "Rolladen") {
        await this.generateNewJobShutter();
      } else if (this.selectedOption == "LED") {
        await this.generateNewLEDJob()
      } else {
        await this.generateNewLightJob()
      }
      await this.fetchJobs()
    },
    async generateNewLightJob() {
      if (this.jobName == "") {
        this.showErrName = true
        return
      }
      await axios.post(IP + "/api/cronjobs/generate-job/light", {
        jobName: this.jobName,
        whichLights: this.selectedLights,
        brightness: this.lightBrightness,
        color: this.lightColor,
        expression: this.value,
        oneTimeJob: this.oneTimeJob
      });
      this.resetEvents()
    },
    async generateNewJobShutter() {
      if (this.jobName == "") {
        this.showErrName = true
        return
      }
      await axios.post(IP + "/api/cronjobs/generate-job/shutter", {
        jobName: this.jobName,
        whichShutter: this.selectedShutter,
        direction: this.shutterOption,
        expression: this.value,
        oneTimeJob: this.oneTimeJob
      });
      this.resetEvents()
    },
    async generateNewLEDJob() {
      if (this.jobName == "") {
        this.showErrName = true
        return
      }
      await axios.post(IP + "/api/cronjobs/generate-job/led", {
        jobName: this.jobName,
        whichLED: this.selectedLEDs,
        color: this.color,
        expression: this.value,
        oneTimeJob: this.oneTimeJob
      });
      this.resetEvents()
    },
    async fetchJobs() {
      this.jobs = await axios.get(IP + "/api/cronjobs/all-jobs/").then((response) => response.data);
      console.log(this.jobs);
    },
    async delete_request(request_bool) {
      if (request_bool) {
        let res = await axios.delete(IP + "/api/cronjobs/job/" + this.jobToDelete).then((response) => response.data);
        this.jobToDelete = ""
        await this.fetchJobs()
      }
    },
    async activateJob(jobName) {
      await axios.post(IP + "/api/cronjobs/start-job", {
        jobName: jobName
      }).then((response) => console.log(response.data));
      await this.fetchJobs()
    },
    async deactivateJob(jobName) {
      await axios.post(IP + "/api/cronjobs/stop-job", {
        jobName: jobName
      }).then((response) => console.log(response.data));
      await this.fetchJobs()
    },
    setEdit(job) {
      if (this.edit) {
        this.resetEvents()
      } else {
        this.edit = true
      }
      this.jobName = job.jobName;
      this.value = job.expression;
      this.oneTimeJob = job.oneTimeJob;
      this.selectedOption = job.type
      if (job.type == "Rolladen") {
        this.shutterOption = job.direction
        this.whichShutter = job.whichShutter
      } else if (job.type == "LED") {
        this.selectedLEDs = job.whichLED;
      } else if (job.type == "Licht") {
        console.log(job);
        this.selectedLights = job.whichLight;
        this.lightColor = job.color;
        this.lightBrightness = job.brightness;
      }
    },
    resetEvents() {
      this.edit = false
      this.$nextTick(() => {
        this.showErrName = false
        this.jobName = "";
        this.selectedOption = null;
        this.value = "* * * * *"
      })
    }
  },
  async mounted() {
    await this.fetchJobs()
  }
};
</script>

<style>
.vcron-select-input {
  color: #dee2e6 !important;
  background-color: #212529 !important;
  border-radius: 0.375rem !important;
  background-clip: padding-box !important;
  border: 1px solid #495057 !important;
  font-size: 1rem !important;
  display: block !important;
  width: 100% !important;
  font-weight: 400 !important;
}

.vcron-select-list {
  border: 1px solid #495057 !important;
  background-color: #212529 !important;
}

.vcron-select-col {
  color: #dee2e6 !important;
}

.vcron-select-col:hover {
  color: #dee2e6 !important;
  background-color: rgb(69, 101, 170) !important;
}

.vcron-select-selected {
  background-color: rgb(69, 101, 170) !important;
}

.cursor-pointer {
  cursor: pointer;
}
</style>