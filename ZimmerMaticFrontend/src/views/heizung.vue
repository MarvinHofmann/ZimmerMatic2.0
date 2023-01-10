<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12 mb-3 text-black text-center">
            <h1 class="display-3">Heizungssteuerung</h1>
            <button class="btn btn-outline-danger" @click="send_off()"><i class="bi bi-thermometer-snow"></i> Ausschalten</button>
            <Transition>
              <p v-if="this.off" class="text-muted mt-2">Heizung wird ausgeschalten</p>
            </Transition>
          </div>

          <Heizung :spot="'HZF'" :imgProp="'/Fernsehr.png'"></Heizung>
          <Heizung :spot="'HZFen'" :imgProp="'/Fenster.png'"></Heizung>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
import Navbardark from "../components/navbardark.vue";
import Heizung from "../components/HeizungKachel.vue";
import axios from "axios";
export default {
  data() {
    return {
      off: false,
    };
  },
  components: {
    Navbardark,
    Heizung,
  },
  methods: {
    send_off() {
      this.off = true;
      axios.post("http://192.168.0.138:8080/rest/items/HZF_ST", "0", {
        headers: { "content-type": "text/plain" },
      });
      axios.post("http://192.168.0.138:8080/rest/items/HZFen_ST", "0", {
        headers: { "content-type": "text/plain" },
      });
    },
  },
  mounted() {},
};
</script>

<style scoped>

</style>
