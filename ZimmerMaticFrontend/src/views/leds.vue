<template >
  <div :style="{ background: color }" class="full">
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
            <h1 class="display-3">LEDs</h1>
          </div>
          <div class="col-lg-4 mx-auto mb-3 text-black text-center">
            <input
              id="checkboxAll"
              class="btn-check"
              type="checkbox"
              value="All"
              v-model="checkedSpots"
              @click="check_All()"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxAll"
              >Alle</label
            >
            <input
              id="checkboxCouch"
              class="btn-check"
              type="checkbox"
              value="2"
              v-model="checkedSpots"
              @click="uncheck_All('Couch')"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxCouch"
              >Couch</label
            >
            <input
              id="checkboxDart"
              class="btn-check"
              type="checkbox"
              value="1"
              v-model="checkedSpots"
              @click="uncheck_All('Dart')"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxDart"
              >Dartscheibe</label
            >

            <input
              id="checkboxTable"
              class="btn-check"
              type="checkbox"
              value="4"
              v-model="checkedSpots"
              @click="uncheck_All('Table')"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxTable"
              >Tisch</label
            >

            <input
              id="checkboxTableE"
              class="btn-check"
              type="checkbox"
              value="5"
              v-model="checkedSpots"
              @click="uncheck_All('TableE')"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxTableE"
              >Tisch Emely</label
            >

            <input
              id="checkboxWordC"
              class="btn-check"
              type="checkbox"
              value="3"
              v-model="checkedSpots"
              @click="uncheck_All('WordC')"
            />
            <label class="btn btn-outline-primary btn-lg" for="checkboxWordC"
              >Uhr</label
            >
            <div id="colorPicker" class="center mt-4">
              <div class="child">
                <ColorPicker
                  theme="dark"
                  :color="color"
                  @changeColor="changeColor"
                  @click="fetch_led()"
                />
                <input
                  type="range"
                  class="form-range mt-3 mb-2"
                  v-model="this.brightness"
                  @change="fetch_led()"
                />
              </div>
            </div>
            <button class="btn btn-primary btn-lg mt-3 ">Alles Aus</button>
            <button class="btn btn-primary btn-lg">Arbeiten</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP
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
      color: "#ffffff",
      checkedSpots: [],
      brightness: 100,
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
            spot: this.checkedSpots[i]
          });
        }
      }
    },

    check_All() {
      if (this.checkedSpots.includes("All")) {
        this.checkedSpots = [];
      } else {
        this.checkedSpots = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "All",
        ];
      }
    },

    uncheck_All(spot) {
      console.log("uncheck " + spot);
      let ph = [];
      if (this.checkedSpots.includes("All")) {
        for (let i = 0; i < this.checkedSpots.length; i++) {
          if (this.checkedSpots[i] != "All" && this.checkedSpots[i] != spot) {
            console.log(this.checkedSpots[i]);
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
      this.color = `rgba(${r}, ${g}, ${b}, ${a})`;
      console.log(color.rgba);
    },
  },
  mounted() {},
};
</script>

<style scoped>
.full{
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
</style>
