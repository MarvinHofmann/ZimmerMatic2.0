<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-6 text-center">
      <cron-light v-model="value" @error="error = $event" :locale="'de'"></cron-light>
      <div class="pt-2 text-muted">Cron Expression: {{ value }}</div>
      <select class="form-select" id="cam_select" v-model="this.selected_client">
        <option v-for="option in this.actions">
          {{ option }}
        </option>
        <option disabled v-if="this.actions.length == 0">Keine Aktion gespeichert</option>
      </select>
    </div>
    <div class="col-lg-6 text-center">
      <div class="table-responsive">
        <table class="table align-middle">
          <thead>
            <tr>
              <th scope="col">Job Name</th>
              <th scope="col">Aktion</th>
              <th scope="col">Status</th>
              <th scope="col">Aktionen</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: "* * * * *",
      error: "",
      actions: ["LEDs an", "Rolladen Hoch", "Rolladen Runter"],
    };
  },
};
</script>
