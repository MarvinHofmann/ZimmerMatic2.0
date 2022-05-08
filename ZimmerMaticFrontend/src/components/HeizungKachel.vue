<template>
  <div class="col-lg-6 mx-auto mb-3">
    <div class="card" style="color: #4b515d; border-radius: 35px">
      <div class="card-body p-4">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-6 text-black mt-4">
              <h1 class="display-5 text-center mb-2">
                <strong>{{ this.setTemp }}</strong>
              </h1>
              <hr class="bg-dark border-2 border-top mb-1" />
              <p class="text-center mt-0 mb-4">{{this.spot}}</p>
              <h4>Gemessen: {{ this.measured }}</h4>
              <h4>Ventil: {{ this.valve }}</h4>
              <h4>Gesetzt: {{ this.rangeSlider }} {{ this.string }}</h4>
            </div>
            <div class="col-lg-6 text-black text-center mt-2">
              <input
                type="range"
                orient="vertical"
                min="5"
                max="31"
                v-model="rangeSlider"
                @input="changeStyle()"
                @change="send_fetch()"
              />
              <p class="mb-0">Temperatur</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  components: {},
  props: ["spot"],
  data() {
    return {
      rangeSlider: 2,
      measured: 0,
      valve: 0,
      setTemp: 0,
      string: "",
    };
  },
  methods: {
    send_fetch() {
      console.log(this.rangeSlider);
      let adresse = "http://192.168.0.138:8080/rest/items/" + this.spot + "_ST";
      axios.post(adresse, this.rangeSlider, {
        headers: { "content-type": "text/plain" },
      });
    },
    changeStyle() {
      this.string = "°C";
    },
    async getInformation() {
      this.measured = await axios
        .get("http://192.168.0.138:8080/rest/items/" + this.spot + "_AT/state")
        .then((response) => response.data);
      this.valve = await axios
        .get("http://192.168.0.138:8080/rest/items/" + this.spot + "_V/state")
        .then((response) => response.data);
      this.setTemp = await axios
        .get("http://192.168.0.138:8080/rest/items/" + this.spot + "_ST/state")
        .then((response) => response.data);
      this.rangeSlider = this.setTemp;
    },
  },
  async mounted() {
    this.getInformation();
  },
};
</script>
<style scoped>
h4 {
  font-size: 22px;
  font-weight: 400;
}
.center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

#rangeValue {
  font-size: 35px;
  text-align: center;
  color: rgb(54, 54, 54);
}

input[type="range"][orient="vertical"] {
  -webkit-appearance: slider-vertical;
  height: 300px;
  width: 90px;
  border-radius: 7px;
  background: #e6e1e1;
  outline: none;
  overflow: hidden;
}

input[type="range"][orient="vertical"]::-webkit-slider-runnable-track {
  width: 120px;
  background: rgb(189, 189, 189);
  border: 0px solid black;
}

input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  background: #e7e2e2;
  border-radius: 10px;
  /**box-shadow: 0px 340px 0px 340px #017ce7;*/
  box-shadow: 0px 340px 0px 340px #1266f1;
  cursor: pointer;
  margin-right: -50px;
}

input[type="range"][orient="vertical"]::-moz-range-thumb {
  width: 120px;
  background: rgb(197, 188, 188);
  border: 0px solid black;
}

input[type="range"]::-moz-range-thumb {
  -webkit-appearance: none;
  border-radius: 0px;
  box-shadow: 0px 340px 0px 340px #1266f1;
  cursor: pointer;
  margin-right: -50px;
}
</style>
