<template>
  <tr>
    <th scope="row">{{ this.spot }}</th>
    <td>{{ this.color }}</td>
    <td>{{ this.brightness }}</td>
    <td v-if="!this.offline">
      <span v-if="this.out" class="badge rounded-pill bg-danger">Aus</span>
      <span v-else class="badge rounded-pill bg-success">An</span>
    </td>
    <td v-else>
      <span v-if="this.offline" class="badge rounded-pill bg-dark"
        >unavailable</span
      >
    </td>
    <td v-if="this.out">
      <button
        :disabled="this.offline"
        @click="switchState()"
        class="btn btn-outline-success action bi bi-power"
      ></button>
    </td>
    <td v-else>
      <button
        :disabled="this.offline"
        @click="switchState()"
        class="btn btn-outline-danger action bi bi-power"
      ></button>
    </td>
  </tr>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import axios from "axios";
export default {
  components: {},

  props: ["spot", "name", "uid"],
  data() {
    return {
      brightness: 0,
      out: false,
      color: 0,
      offline: false,
    };
  },
  methods: {
    async switchState() {
      if (!this.out) {
        this.setLampBrightness("0");
        this.brightness = 0;
        this.out = true;
      } else {
        await this.setLampBrightness(30);
        setTimeout(() => {}, 2000);
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
    async setLampBrightness(value) {
      await axios.post(
        "http://192.168.0.138:8080/rest/items/" +
          this.name +
          "_" +
          "Helligkeit",
        value,
        { headers: { "content-type": "text/plain" } }
      );
    },
    async get_openhab_devices_status() {
      let res = await axios
        .get(
          "http://192.168.0.138:8080/rest/things/" + this.uid + "/status",
          {
            auth: {
              username: "MH",
              password: "1010",
            },
          }
        )
        .then((response) => response.data);
      console.log(res.status);
      if (res.status == "OFFLINE") {
        this.offline = true;
      }
    },
  },
  async mounted() {
    this.get_openhab_devices_status();
    this.getState();
  },
};
</script>
<style scoped>
.action {
  width: 50px;
}
</style>
