<template>
  <tr>
    <th scope="row">{{ this.spot }}</th>
    <td><div :style="{ 'background-color': color }" class="square"></div></td>
    <td>{{ this.brightness }}</td>
    <td><button class="btn btn-outline-dark action bi bi-power"></button></td>
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
      color: "#3167FF",
      brightness: 0,
      json: "",
      cardbg: "white",
      out: false,
      fontcolor: "black",
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
        setTimeout(() => {}, 2000);
        this.getState();
        this.cardbg = "white";
        this.fontcolor = "black";
        this.out = false;
      }
    },
    async getState() {
      let color = await axios
        .post(IP + "/api/LED/state", {
          subPath: this.mqtt_topic,
        })
        .then((response) => response.data);
      console.log(color);
      this.json = JSON.stringify(color, undefined, 2);
      this.color = `rgb(${color.r}, ${color.g}, ${color.b}, ${color.v})`;
      this.brightness = (color.v / 2.55).toFixed(0);
      if (color.r == 0 && color.g == 0 && color.b == 0) {
        console.log("All Null");
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
      this.color = `rgb(${0}, ${0}, ${0}, ${0})`;
      this.cardbg = `rgb(${211}, ${211}, ${211}, ${200})`;
      this.out = true;
      this.fontcolor = "gray";
    },
  },
  async mounted() {
    this.getState();
  },
};
</script>
<style scoped>
.square {
  height: 30px;
  width: 120px;
  border-width: 1px;
  border-radius: 2px;
  border-style: solid;
  border-color: rgb(2, 2, 2);
  background-color: rgb(121, 121, 121);
}
.action {
  width: 50px;
}
h1 {
  font-size: 26pt;
}
</style>
