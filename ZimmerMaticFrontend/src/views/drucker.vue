<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-5 text-black text-center">
            <h1 class="display-3">3D-Drucker</h1>
            <div class="form-check form-switch" id="container">
              <input class="form-check-input mt-5 mb-5" type="checkbox" v-model="state" @change="fetch_printer()" style="transform: scale(2.5)" />
            </div>

            <button @click="toOctoprint()" type="button" class="btn btn-primary mt-4" id="btnOcto" style="transform: scale(1.5)">Zu OctoPrint</button>
          </div>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
import Navbardark from "../components/navbardark.vue";
import axios from "axios";
export default {
  components: {
    Navbardark,
  },
  data() {
    return {
      state: false,
      requested_state: "",
    };
  },
  methods: {
    fetch_printer() {
      console.log(this.state);
      const value = this.state ? "ON" : "OFF";
      console.log(value);
      axios.post("http://192.168.0.138:8080/rest/items/StD_Betrieb", value, { headers: { "content-type": "text/plain" } });
    },
    toOctoprint() {
      window.open("http://octopi.local");
    },
  },
  async mounted() {
    this.requested_state = await axios.get("http://192.168.0.138:8080/rest/items/StD_Betrieb/state").then((response) => response.data);
    if (this.requested_state === "ON") {
      this.state = true;
    } else {
      this.state = false;
    }
  },
};
</script>

<style scoped>
#container {
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
}
</style>
