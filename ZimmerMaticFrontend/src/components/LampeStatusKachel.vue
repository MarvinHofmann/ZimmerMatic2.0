<template>
  <div class="col-lg-3 mx-atuo mb-3" id="outside">
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
              <h5  :style="{ 'color': fontcolor }" > {{ this.spot }}</h5>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-12 text-black mt-2" id="rowout">
              <h1 v-if="out" :style="{'color': fontcolor}">OFF</h1>
              <div v-else class="col-lg-12 text-black mt-2 text-center">
                {{ this.brightness }} %
              </div>
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

  props: ["spot", "name"],
  data() {
    return {
      brightness: 0,
      out: false,
      cardbg: "white",
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
.card{
  height: 140px;
}
</style>
