<template>
  <tr>
    <th scope="row">{{ this.spot }}</th>
    <td class="d-none d-lg-table-cell">
      <div :style="{ 'background-color': color }" class="square"></div>
    </td>
    <td>{{ this.brightness }}%</td>
    <td>
      <span v-if="this.is_off" class="badge rounded-pill bg-danger">Aus</span>
      <span v-else class="badge rounded-pill bg-success">An</span>
    </td>
    <td v-if="this.is_off"><button @click="switchState()" class="btn btn-sm btn-outline-success bi bi-power"></button></td>
    <td v-else><button @click="switchState()" class="btn btn-sm btn-outline-danger bi bi-power"></button></td>
  </tr>
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
      color: "#00000",
      brightness: 0,
      json: "",
      out: false,
      fontcolor: "black",
      is_off: false,
    };
  },
  methods: {
    async switchState() {
      if (!this.out) {
        this.fetch_led(0, 0, 0, 0);
        this.setStateOff();
        this.out = true;
      } else {
        await this.fetch_led(255, 255, 255, 100);
        setTimeout(() => { }, 2000);
        this.getState();
        this.fontcolor = "black";
        this.out = false;
        this.is_off = false;
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
        this.setStateOff();
      }
    },
    async fetch_led(r, g, b, v) {
      await axios.post(IP + "/api/LED/Single", {
        red: r,
        green: g,
        blue: b,
        value: v,
        spot: this.spotNum,
      });
    },
    setStateOff() {
      this.brightness = 0;
      this.color = "black";
      this.out = true;
      this.fontcolor = "gray";
      this.is_off = true;
    },
  },
  async mounted() {
    this.getState();
    this.timer = setInterval(() => {
      this.getState()
    }, 10000);
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.timer);
  },
};
</script>
<style scoped>
.square {
  height: 30px;
  width: 100px;
  border-radius: 5px;
  border: 1px dashed black;
}

h1 {
  font-size: 26pt;
}
</style>
