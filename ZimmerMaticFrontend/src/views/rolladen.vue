<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-center" id="container">
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
          <div class="col-lg-6 mx-auto mb-3 text-center"></div>
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

<style scoped>
#container {
  display: grid;
  align-items: center;
  justify-content: center;
  align-content: center;
}
.btnIcon {
  width: 125px;
  height: 125px;
  border-width: 2px;
  border-radius: 10px;
  background-color: #212529;
  border-color: #1266f1;
  margin: 10px 10px 10px 10px;
}
.btnIcon:hover {
  background-color: #474848;
}
.fas {
  color: #1266f1;
}
</style>
