<template>
  <div class="row d-flex justify-content-center">
    <div class="col-lg-6 text-center">
      <cron-light v-model="value" @error="error = $event" :locale="'de'"></cron-light>
      <div class="mt-1 text-muted">Cron Expression: {{ value }}</div>
      <div class="form-floating mt-1">
        <select
          class="form-select"
          v-model="this.selected_action"
          placeholder="Choose"
          id="floatingSelect"
          aria-label="Floating label select example"
        >
          <option v-for="option in this.actions" :value="option">
            {{ option }}
          </option>
          <option disabled v-if="this.actions.length == 0">Keine Aktion gespeichert</option>
        </select>
        <label for="floatingSelect">Aktion Wählen</label>
      </div>
      <div class="form-floating mt-3">
        <input type="text" class="form-control" id="floatingInput" placeholder="Name" />
        <label for="floatingInput">Name des Jobs</label>
      </div>
      <div class="d-grid gap-2 mt-3">
        <button class="btn btn-outline-success" type="button">Job Anlegen</button>
      </div>
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
          <tbody></tbody>
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
      input_value: null,
    };
  },
};
</script>
