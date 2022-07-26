<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
            <h1 class="display-3">Rolladen</h1>
          </div>
          <div
            class="col-lg-12 mx-auto mb-3 text-black text-center"
            id="container"
          >
            <div class="row">
              <button class="btnIcon" @click="send_fetch('UP')">
                <i class="fas fa-chevron-up fa-5x"></i>
              </button>
            </div>
            <div class="row">
              <button class="btnIcon" @click="send_fetch('STOP')">
                <i class="fas fa-minus fa-4x"></i>
              </button>
            </div>
            <div class="row">
              <button class="btnIcon" @click="send_fetch('DOWN')">
                <i class="fas fa-chevron-down fa-5x"></i>
              </button>
            </div>
          </div>
          <div class="col-lg-6 mx-auto mb-3 text-black text-center"></div>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import axios from "axios";
import Navbardark from "../components/navbardark.vue";
export default {
  components: {
    Navbardark,
  },
  methods: {
    send_fetch(pDirection) {
      console.log("Fetch Rolladen: " + pDirection);
      axios.post(IP + "/api/Rolladen", { direction: pDirection });
    },
  },
  mounted() {},
};
</script>

<style>
#container {
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.btnIcon {
  width: 125px;
  height: 125px;
  background-color: white;
  border-width: 2px;
  border-radius: 10px;
  border-color: #1266F1;
  margin: 10px 10px 10px 10px;
}
.btnIcon:hover {
  background-color: aliceblue;
} 
.fas{
  color: #1266F1;
}
</style>
