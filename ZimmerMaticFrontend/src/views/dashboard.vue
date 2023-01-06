<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
          </div>
          <div class="col-lg-8">
            <div class="card card-body">
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th style="width: 25%" scope="col">Standort</th>
                      <th style="width: 25%" scope="col">Color</th>
                      <th style="width: 25%" scope="col">Helligkeit</th>
                      <th style="width: 25%" scope="col">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LED
                      :spot="'Couch'"
                      :mqtt_topic="'colorCouch'"
                      :spotNum="'2'"
                    ></LED>
                    <LED
                      :spot="'Dart'"
                      :mqtt_topic="'colorKamin'"
                      :spotNum="'1'"
                    ></LED>
                    <LED
                      :spot="'Uhr'"
                      :mqtt_topic="'colorUhr'"
                      :spotNum="'3'"
                    ></LED>
                    <LED
                      :spot="'Marvin'"
                      :mqtt_topic="'colorMarvin'"
                      :spotNum="'4'"
                    ></LED>
                    <LED
                      :spot="'Emely'"
                      :mqtt_topic="'colorEmely'"
                      :spotNum="'5'"
                    ></LED>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="card-header">Serverstatus</div>
              <div class="card-body">
                <p>Backend <span
                    v-if="this.backend == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  ></p>
                <p>Systemload {{ this.pi_info.load.avgLoad }}</p>
                <p>RAM: {{ this.mem_use }} %</p>
                <p>Speicherbelegung {{ this.pi_info.disk[0].use }}%</p>
                <p>Temperatur: {{ this.pi_info.cpu_temp.main }}°C</p>
                <p>Running Container {{ this.pi_info.docker.containersRunning }}</p>
                <p>Stopped Container {{ this.pi_info.docker.containersStopped }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col-lg-6">
            <div class="card card-body">
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th style="width: 25%" scope="col">Standort</th>
                      <th style="width: 25%" scope="col">Farbtemperatur</th>
                      <th style="width: 25%" scope="col">Helligkeit</th>
                      <th style="width: 25%" scope="col">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    <LIGHT :spot="'Bett Links'" :name="'BL'"></LIGHT>
                    <LIGHT :spot="'Bett Rechts'" :name="'BR'"></LIGHT>
                    <LIGHT :spot="'Basteltisch'" :name="'BT'"></LIGHT>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="card h-100">
              <div class="card-header">Services</div>
              <div class="card-body">
                <p>
                  Openhab
                  <span
                    v-if="this.openhab == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                </p>
                <p>
                  Portainer Online
                  <span
                    v-if="this.portainer == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                </p>
                <p>
                  EMQX Online
                  <span
                    v-if="this.emqx == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                </p>
                <p>
                  Pocketbase
                  <span class="badge rounded-pill bg-danger">Offline</span>
                </p>
                <p>
                  MongoDB
                  <span
                    v-if="this.mongo == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100"></div>
          </div>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import Navbardark from "../components/navbardark.vue";
import LED from "../components/LEDStatusKachel.vue";
import LIGHT from "../components/LampeStatusKachel.vue";
import axios from "axios";
export default {
  data() {
    return {
      openhab: 0,
      portainer: 0,
      emqx: 0,
      mongo: 0,
      backend: 0,
      pi_info: {
        cpu_si: {},
        memory: {},
        cpu_temp: {},
        load: {},
        disk: [{}],
        docker: {}
      },
      mem_use: 0
    };
  },
  components: {
    Navbardark,
    LED,
    LIGHT,
  },
  methods: {
    async get_state(ip){
      let res = await axios
      .get(ip)
      .then((response) => response.status);
      return res
    },
    async get_system_info(){
      let res = await axios.get("http://zimmermatic:3443/api/os_info").then((response) => response)
      this.pi_info = res.data
      this.backend = res.status
      this.mem_use =  ((this.pi_info.memory.free / this.pi_info.memory.used) * 100).toFixed(2)
    },
  },
  async mounted() {
    try {
      await this.get_system_info()  
    } catch (error) {
      console.log("backend unavailable", error);
    }
    this.timer = setInterval(this.fetchEventsList, 30000);
    this.openhab = await this.get_state("http://192.168.0.138:8080/rest/items")
    console.log(this.openhab);
    this.mongo = await this.get_state("http://192.168.0.138:42069/")
    this.emqx = await this.get_state("http://192.168.0.138:18083/status")
    this.portainer = await this.get_state("http://192.168.0.138:9000/")
    
  },
};
</script>

<style>
#rowout {
  display: flex;
  justify-content: center;
}
</style>
