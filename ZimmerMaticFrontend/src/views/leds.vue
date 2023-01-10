<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
            <h1 class="display-3">LEDs</h1>
          </div>
          <div class="col-lg-4 mx-auto mb-3 text-black text-center">
            <input id="checkboxAll" class="btn-check" type="checkbox" value="All" v-model="checkedSpots" @click="check_All()" />
            <label class="btn btn-outline-primary" for="checkboxAll" :style="{ 'border-color': color }">Alle</label>
            <input id="checkboxCouch" class="btn-check" type="checkbox" value="2" v-model="checkedSpots" @click="uncheck_All('Couch')" />
            <label class="btn btn-outline-primary" for="checkboxCouch" :style="{ 'border-color': color }">Couch</label>
            <input id="checkboxDart" class="btn-check" type="checkbox" value="1" v-model="checkedSpots" @click="uncheck_All('Dart')" />
            <label class="btn btn-outline-primary" for="checkboxDart" :style="{ 'border-color': color }">Dartscheibe</label>

            <input id="checkboxTable" class="btn-check" type="checkbox" value="4" v-model="checkedSpots" @click="uncheck_All('Table')" />
            <label class="btn btn-outline-primary" for="checkboxTable" :style="{ 'border-color': color }">Tisch</label>

            <input id="checkboxTableE" class="btn-check" type="checkbox" value="5" v-model="checkedSpots" @click="uncheck_All('TableE')" />
            <label class="btn btn-outline-primary" for="checkboxTableE" :style="{ 'border-color': color }"> Tisch Emely </label>

            <input id="checkboxWordC" class="btn-check" type="checkbox" value="3" v-model="checkedSpots" @click="uncheck_All('WordC')" />
            <label class="btn btn-outline-primary" for="checkboxWordC" :style="{ 'border-color': color }">Uhr</label>
            <div id="colorPicker" class="center mt-4 mb-4">
              <div class="child">
                <ColorPicker theme="dark" :color="color" @changeColor="changeColor" @click="fetch_led()" />
              </div>
            </div>
            <button @click="fetch_Off" class="btn btn-primary">Alles Aus</button>
            <button @click="fetch_Work" class="btn btn-primary">Arbeiten</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import { ColorPicker } from "vue-color-kit";
import "vue-color-kit/dist/vue-color-kit.css";
import Navbardark from "../components/navbardark.vue";
import axios from "axios";
export default {
  components: {
    Navbardark,
    ColorPicker,
  },
  data() {
    return {
      color: "#3167FF",
      checkedSpots: [],
      brightness: 0,
      red: 0,
      green: 0,
      blue: 0,
    };
  },
  methods: {
    fetch_led() {
      if (this.checkedSpots.includes("All")) {
        //Send fetch to /All
        axios.post(IP + "/api/LED/ALL", {
          red: this.red,
          green: this.green,
          blue: this.blue,
          value: this.brightness,
        });
      } else {
        for (let i = 0; i < this.checkedSpots.length; i++) {
          axios.post(IP + "/api/LED/Single", {
            red: this.red,
            green: this.green,
            blue: this.blue,
            value: this.brightness,
            spot: this.checkedSpots[i],
          });
        }
      }
    },

    check_All() {
      if (this.checkedSpots.includes("All")) {
        this.checkedSpots = [];
      } else {
        this.checkedSpots = ["1", "2", "3", "4", "5", "All"];
      }
    },

    uncheck_All(spot) {
      let ph = [];
      if (this.checkedSpots.includes("All")) {
        for (let i = 0; i < this.checkedSpots.length; i++) {
          if (this.checkedSpots[i] != "All" && this.checkedSpots[i] != spot) {
            ph[i] = this.checkedSpots[i];
          }
        }
        this.checkedSpots = [];
        this.checkedSpots = ph;
      }
    },
    changeColor(color) {
      const { r, g, b, a } = color.rgba;
      this.red = r;
      this.green = g;
      this.blue = b;
      this.brightness = a * 100;
      this.color = `rgb(${r}, ${g}, ${b}, ${this.brightness})`;
    },

    fetch_Off() {
      axios.post(IP + "/api/LED/ALL", {
        red: 0,
        green: 0,
        blue: 0,
        value: 0,
      });
    },
    fetch_Work() {
      axios.get(IP + "/api/LED/Work");
    },
  },
  async mounted() {},
};
</script>

<style scoped>
.full {
  padding-bottom: 100%;
}
.hu-color-picker {
  width: 220px !important;
}
.center {
  display: grid;
  justify-content: center;
  align-items: center;
}
.btn{
  width: 120px;
  margin: 10px 10px 10px 10px
}
</style>
