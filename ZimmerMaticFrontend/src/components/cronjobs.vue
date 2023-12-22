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
        <div class="form-check">
          <input class="form-check-input" type="checkbox" v-model="this.selectedLEDs" :value="'all'" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            Alle
          </label>
        </div>
        <div class="form-check" v-for="led in this.leds">
          <input class="form-check-input" type="checkbox" v-model="this.selectedLEDs" :value="led.path" id="defaultCheck1">
          <label class="form-check-label" for="defaultCheck1">
            {{ led.name }}
          </label>
        </div>
        {{ this.color }}
        <input type="color" v-model="this.color" class="form-control form-control-color" id="exampleColorInput" value="#563d7c" title="Choose your color">
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
              <th scope="col">Cron Expression</th>
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
                <div v-if="item.active">Aktiv</div>
                <div v-else>Inaktiv</div>
              </td>
              <td v-if="item.active">
                <button class="me-1 btn btn-sm btn-outline-danger bi bi-power"></button>
                <button class="btn btn-sm btn-outline-danger bi bi-trash"></button>
              </td>
              <td v-else>
                <button class="me-1 btn btn-sm btn-outline-success bi bi-power"></button>
                <button class="btn btn-sm btn-outline-danger bi bi-trash"></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
const IP = import.meta.env.VITE_SERVER_IP;
export default {
  data() {
    return {
      jobName: "Beschreibung",
      selectedOption: null,
      selectedLEDs: [],
      color: null,
      value: "* * * * *",
      error: "",
      actions: ["LED", "Rolladen"],
      leds: [
        { name: "Kamin", path: "LED_COLOR/colorKamin" },
        { name: "Couch", path: "LED_COLOR/colorCouch" },
        { name: "Uhr", path: "LED_COLOR/colorUhr" },
        { name: "Marvin", path: "LED_COLOR/colorMarvin" },
        { name: "Emely", path: "LED_COLOR/colorEmely" },
      ],
      jobs: [],
      shutterOption: 'up',
      selectedShutter: 'ROLLADEN/stateBett'
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
    }
  },
  async mounted() {
    await this.fetchJobs()
  }
};
</script>