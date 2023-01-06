<template>
  <tr>
    <th scope="row">{{ this.spot }}</th>
    <td>{{ this.color }}</td>
    <td>{{ this.brightness }}</td>
    <td><button class="btn btn-outline-dark action bi bi-power"></button></td>
  </tr>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import axios from "axios";
export default {
  components: {},

  props: ["spot", "name"],
  data() {
    return {
      brightness: 0,
      out: false,
      cardbg: "white",
      color: 0,
      fontcolor: "black"
    };
  },
  methods: {
    async switchState(){
      if (!this.out) {
        this.setLampBrightness("0");
        this.setStateOff();
      } else {
        await this.setLampBrightness(30);
        setTimeout(() => {   }, 2000);
        this.getState();
        this.cardbg = "white";
        this.fontcolor = "black"
        this.out = false;
      }
    },
    async getState() {
      this.brightness = await axios
        .get(
          "http://192.168.0.138:8080/rest/items/" +
            this.name +
            "_Helligkeit/state"
        )
        .then((response) => response.data);

      this.color = await axios
        .get(
          "http://192.168.0.138:8080/rest/items/" +
            this.name +
            "_Farbtemperatur/state"
        )
        .then((response) => response.data);
      if (this.brightness == 0) {
          this.setStateOff();
      }
    },
    setStateOff(){
        this.out = true;
        this.fontcolor = "gray"
        this.cardbg = `rgb(${211}, ${211}, ${211}, ${200})`;
    },
    async setLampBrightness(value){
      await axios.post(
          "http://192.168.0.138:8080/rest/items/" +
            this.name +
            "_" +
            "Helligkeit",
          value,
          { headers: { "content-type": "text/plain" } }
        );
    }
  },
  async mounted() {
    this.getState();
  },
};
</script>
<style scoped>
.action {
  width: 50px;
}
</style>
