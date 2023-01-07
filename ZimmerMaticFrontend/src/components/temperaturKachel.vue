<template>
  <div class="col-lg-4 mb-3 px-3">
    <div class="card" style="color: #4b515d; border-radius: 35px">
      <div class="card-body p-4">
        <div class="d-flex">
          <h5 class="flex-grow-1">{{ this.spot }}</h5>
          <h5>{{ responsedata.time }}</h5>
        </div>

        <div class="d-flex flex-column text-center mt-5 mb-4">
          <h6 class="display-4 mb-0" style="color: #1c2331; font-weight: 400">{{ responsedata.temperature }} °C</h6>
        </div>
        <hr class="bg-dark border-3 border-dark border-top" />
        <div class="row">
          <div class="col-lg-6 text-center mt-4">
            <div>
              <h5>Last: {{ responsedata.lastTemperature }} °C</h5>
              <h5>Humidity: {{ responsedata.humidity }}%</h5>
            </div>
          </div>

          <div class="col-lg-6 text-center">
            <img id="img" :src="this.imgProp" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import axios from "axios";
export default {
  props: ["spot", "imgProp"],

  data() {
    return {
      responsedata: {},
    };
  },
  async mounted() {
    this.responsedata = await axios
      .post(IP + "/api/TempData", {
        spot: this.spot,
      })
      .then((response) => response.data);
    console.log(this.responsedata);
  },

  methods: {},
};
</script>

<style>
hr {
  margin-top: -2%;
  color: #2c3e50;
  background-color: #2c3e50;
  border: 0;
  opacity: 0.75;
}
#img {
  width: 100px;
}
</style>
