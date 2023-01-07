<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-2 text-black text-center">
            <h1 class="display-3">Licht</h1>
          </div>
          <div class="container">
            <div class="row">
              <div class="col-lg-12 text-black text-center">
                <input id="checkboxBL" class="btn-check" type="checkbox" value="BL" v-model="checkedSpots" />
                <label class="btn btn-outline-primary btn-lg" for="checkboxBL">Bett Links</label>

                <input id="checkboxBR" class="btn-check" type="checkbox" value="BR" v-model="checkedSpots" />
                <label class="btn btn-outline-primary btn-lg" for="checkboxBR">Bett Rechts</label>

                <input id="checkboxBT" class="btn-check" type="checkbox" value="BT" v-model="checkedSpots" />
                <label class="btn btn-outline-primary btn-lg" for="checkboxBT">Basteltisch</label>
              </div>
            </div>
            <div class="container">
              <div class="row">
                <div class="col-lg-3 mx-auto mb-2 text-black text-center"></div>
                <div class="col-lg-2 mx-auto mb-2 text-black text-center">
                  <Slider @changeValue="send_fetch" :slidername="'Helligkeit'" />
                </div>
                <div class="col-lg-2 mx-auto mb-2 text-black text-center">
                  <Slider @changeValue="send_fetch" :slidername="'Farbtemperatur'" />
                </div>
                <div class="col-lg-3 mx-auto mb-2 text-black text-center"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Slider from "../components/Slider.vue";
import axios from "axios";
import Navbardark from "../components/navbardark.vue";
export default {
  components: {
    Navbardark,
    Slider,
  },
  data() {
    return {
      checkedSpots: [],
      sliderValue: 20,
    };
  },
  methods: {
    send_fetch(obj) {
      this.sliderValue = obj.val;
      for (let i = 0; i < this.checkedSpots.length; i++) {
        axios.post("http://192.168.0.138:8080/rest/items/" + this.checkedSpots[i] + "_" + obj.name, this.sliderValue, {
          headers: { "content-type": "text/plain" },
        });
      }
    },
  },
  beforeMount() {
    this.checkedSpots.push("BL");
    this.checkedSpots.push("BR");
  },
};
</script>
<style>
.btn {
  width: 160px;
  margin: 10px 10px 10px 10px;
}
</style>
