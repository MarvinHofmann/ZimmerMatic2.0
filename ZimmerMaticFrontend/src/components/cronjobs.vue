<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-6">
      <cron-light v-model="value" @error="error = $event" :locale="'de'"></cron-light>
      <div class="mt-1 text-muted">Cron Expression: {{ value }}</div>
      <div class="form-floating mt-1">
        <select class="form-select" v-model="this.selectedOption" placeholder="Choose" id="floatingSelect" aria-label="Floating label select example">
          <option v-for="option in this.actions" :value="option">
            {{ option }}
          </option>
          <option disabled v-if="this.actions.length == 0">Keine Aktion gespeichert</option>
        </select>
        <label for="floatingSelect">Aktion Wählen</label>
      </div>
      <div class="form-floating mt-3">
        <input type="text" class="form-control" id="floatingInput" v-model="this.jobName" placeholder="Name" />
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
          <input class="form-check-input" type="radio" v-model="this.shutterOption" :value="'up'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck0">
            Hoch
          </label>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="radio" v-model="this.shutterOption" :value="'down'" id="defaultCheck1">
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
      <div class="d-grid gap-2 mt-3">
        <button class="btn btn-outline-success" type="button" @click="generateNewJob()">Job Anlegen</button>
      </div>
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
              <th scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in this.jobs">
              <th scope="row">{{ item.jobName }}</th>
              <td>{{ item.expression }}</td>
              <td>{{ item.type }}</td>
              <td>
                <span v-if="item.active" class="badge rounded-pill bg-success">Aktiv</span>
                <span v-else class="badge rounded-pill bg-danger">Inaktiv</span>
              </td>
              <td>
                <div class="d-flex justify-content-center">
                  <button v-if="item.active" @click="this.deactivateJob(item.jobName)" class="btn btn-sm btn-outline-danger bi bi-power mx-2"></button>
                  <button v-else @click="this.activateJob(item.jobName)" class="btn btn-sm btn-outline-success bi bi-power mx-2"></button>
                  <button @click="this.jobToDelete = item.jobName" data-bs-target="#deleteModal" data-bs-toggle="modal" class="btn btn-sm btn-outline-danger bi bi-trash"></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <deleteModal id="deleteModal" :delete_item="this.jobToDelete" @delete_answer="delete_request"></deleteModal>
</template>

<script>
import axios from 'axios';
const IP = import.meta.env.VITE_SERVER_IP;
import deleteModal from "./deleteModal.vue"
export default {
  components: {
    deleteModal
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
      lights: [],
      jobs: [],
      shutterOption: 'up',
      selectedShutter: 'ROLLADEN/stateBett',
      jobToDelete: ""
    };
  },
  methods: {
    async generateNewJob() {
      if (this.selectedOption == "Rolladen") {
        await this.generateNewJobShutter();
      } else {
        await this.generateNewLEDJob()
      }
      await this.fetchJobs()
    },
    async generateNewJobShutter() {
      await axios.post(IP + "/api/cronjobs/generate-job/shutter", {
        jobName: this.jobName,
        whichShutter: this.selectedShutter,
        direction: this.shutterOption,
        expression: this.value
      });
    },
    async generateNewLEDJob() {
      await axios.post(IP + "/api/cronjobs/generate-job/led", {
        jobName: this.jobName,
        whichLED: this.selectedLEDs,
        color: this.color,
        expression: this.value
      });
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
    }
  },
  async mounted() {
    await this.fetchJobs()
  }
};
</script>