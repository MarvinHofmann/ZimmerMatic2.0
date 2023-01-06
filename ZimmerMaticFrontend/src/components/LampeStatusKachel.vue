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
      const token =
        "eyJraWQiOm51bGwsImFsZyI6IlJTMjU2In0.eyJpc3MiOiJvcGVuaGFiIiwiYXVkIjoib3BlbmhhYiIsImV4cCI6MTY3MzAzNDc0NiwianRpIjoiZXBtb0NyNDNoZlRPTnE3U2xwM2NJQSIsImlhdCI6MTY3MzAzMTE0NiwibmJmIjoxNjczMDMxMDI2LCJzdWIiOiJNSCIsImNsaWVudF9pZCI6Imh0dHA6Ly96aW1tZXJtYXRpYzo4MDgwIiwic2NvcGUiOiJhZG1pbiIsInJvbGUiOlsiYWRtaW5pc3RyYXRvciJdfQ.igi5dU8XOug_3P_7C3n82EwYyJsXVpmYZanH8P2oiKC45LZltgUtIqzTXOedNDo9zLiWwyRuL2zhEg1bBVmKKjzvNd44qplfHVHQhNV2A0vs5fd9NCsHJbo2Iu69FaLI9om_4QdUpQ7M29_Mxfc-5M9Wmf6hfJyA4qMRyL3cmfUvES9Jn8ijrVAqaQ_pvAPfcbQG1B2Li7RazA5HeAodUeJGSffxXP9qEg2gCs0qAf7vEzzX4vwfAHpPOJDxYOcusCuSY-v7nGU08ebx3JVM75kdd0ErPzhSLphbMcFG62UhX4M924Qkq81Ym1pn9oZfQ-MkOuvrBG2KgL43Lbk3sA";
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      console.log(this.uid);
      let res = await axios.get(
          "http://192.168.0.138:8080/rest/things/" + this.uid + "/status",
          config
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
