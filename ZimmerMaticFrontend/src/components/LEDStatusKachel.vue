<template>
  <div class="col-lg-2 mx-atuo mb-3" id="outside">
    <div
      class="card"
      :style="{ 'background-color': cardbg }"
      style="border-radius: 35px"
      @click="switchState()"
    >
      <div class="card-body p-4">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-12 text-black mt-2 text-center">
              <h5>{{ this.spot }}</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 text-black mt-2" id="rowout">
              <h1 v-if="out">OFF</h1>
              <div
                v-else
                :style="{ 'background-color': color }"
                class="square"
              ></div>
            </div>
            <div class="col-lg-12 text-black mt-2 text-center">
              {{ this.brightness }} %
            </div>
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
  components: {},
   //1 Dart, 2 Couch, 3 WordC, 4 Marvin, 5 Emely
  props: ["spot", "mqtt_topic", "spotNum"],
  data() {
    return {
      color: "#3167FF",
      brightness: 0,
      json: "",
      cardbg: "white",
      out: false,
    };
  },
  methods: {
    switchState() {
      
      if (!this.out) {
        this.fetch_led(0, 0, 0, 0);
        this.setStateOff();
        this.out = true;
      } else {
        this.fetch_led(255, 255, 255, 100);
        this.getState();
        this.cardbg = "white";
        this.out = false
      }
    },
    async getState() {
      let color = await axios
        .post(IP + "/api/LED/state", {
          subPath: this.mqtt_topic,
        })
        .then((response) => response.data);
      this.json = JSON.stringify(color, undefined, 2);
      this.color = `rgb(${color.r}, ${color.g}, ${color.b}, ${color.v})`;
      this.brightness = (color.v / 2.55).toFixed(0);
      if (color.r == 0 && color.g == 0 && color.b == 0) {
        console.log("All Null");
        this.setStateOff();
      }
    },
    fetch_led(r, g, b, v) {
      axios.post(IP + "/api/LED/Single", {
        red: r,
        green: g,
        blue: b,
        value: v,
        spot: this.spotNum,
      });
    },
    setStateOff() {
      this.brightness = 0;
      this.color = `rgb(${0}, ${0}, ${0}, ${0})`;
      this.cardbg = `rgb(${211}, ${211}, ${211}, ${200})`;
      this.out = true;
    },
  },
  async mounted() {
    this.getState();
  },
};
</script>
<style scoped>
.square {
  height: 50px;
  width: 50px;
  border-width: 2px;
  border-radius: 12px;
  border-style: solid;
  border-color: rgb(2, 2, 2);
  background-color: rgb(121, 121, 121);
}
</style>
