<template>
  <tr>
    <th scope="row">{{ this.spot }}</th>
    <td>{{ this.color }}</td>
    <td>{{ this.brightness }}</td>
    <td ><span v-if="this.out" class="badge rounded-pill bg-danger">Offline</span>
      <span v-else class="badge rounded-pill bg-success">An</span>
    </td>
    <td><button @click="switchState()" class="btn btn-outline-dark action bi bi-power"></button></td>
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
      color: 0,
    };
  },
  methods: {
    async switchState(){
      if (!this.out) {
        this.setLampBrightness("0");
        this.brightness = 0
        this.out = true;
      } else {
        await this.setLampBrightness(30);
        setTimeout(() => {   }, 2000);
        this.getState();
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
          this.out = true;
      }
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
