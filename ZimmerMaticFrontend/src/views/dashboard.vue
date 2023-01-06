<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center"></div>
          <div class="col-lg-8">
            <div class="card card-body">
              <div class="table-responsive">
                <table class="table align-middle">
                  <thead>
                    <tr>
                      <th style="width: 20%" scope="col">Standort</th>
                      <th style="width: 20%" scope="col">Color</th>
                      <th style="width: 20%" scope="col">Helligkeit</th>
                      <th style="width: 20%" scope="col">Status</th>
                      <th style="width: 20%" scope="col">Aktionen</th>
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
          <div class="col-lg-2">
            <div class="card h-100">
              <div class="card-header">Serverstatus</div>
              <div class="card-body">
                <p>
                  Backend
                  <span
                    v-if="this.backend == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                </p>
                <p>Systemload {{ this.pi_info.load.avgLoad }}</p>
                <p>RAM: {{ this.mem_use }} %</p>
                <p>Speicherbelegung {{ this.pi_info.disk[0].use }}%</p>
                <p>Temperatur: {{ this.pi_info.cpu_temp.main }}°C</p>
                <p>Laufende Container {{ this.running_container }}</p>
                <p>Anzahl Container {{ this.container.length }}</p>
              </div>
            </div>
          </div>
          <div class="col-lg-2">
            <div class="card h-100">
              <div class="card-header">Temperatur</div>
              <div class="card-body text-center mt-3">
                <h1 class="display3">
                  <i class="bi bi-thermometer"></i>
                  {{ this.avg_temp_info.avg_temperature }}°C
                </h1>
                <hr class="border" />
                <h1 class="display3">
                  <i class="bi bi-droplet"></i>
                  {{ this.avg_temp_info.avg_humidity }}%
                </h1>
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
                      <th style="width: 20%" scope="col">Standort</th>
                      <th style="width: 20%" scope="col">Farbtemperatur</th>
                      <th style="width: 20%" scope="col">Helligkeit</th>
                      <th style="width: 20%" scope="col">Staus</th>
                      <th style="width: 20%" scope="col">Aktionen</th>
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
                  <a
                    type="button"
                    href="http://zimmermatic:8080"
                    target="_blank"
                    class="bi bi-box-arrow-up-right mx-2"
                  ></a>
                </p>
                <p>
                  Portainer
                  <span
                    v-if="this.portainer == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                  <a
                    type="button"
                    href="http://zimmermatic:9000"
                    target="_blank"
                    class="bi bi-box-arrow-up-right mx-2"
                  ></a>
                </p>
                <p>
                  EMQX
                  <span
                    v-if="this.emqx == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                  <a
                    type="button"
                    href="http://zimmermatic:18083"
                    target="_blank"
                    class="bi bi-box-arrow-up-right mx-2"
                  ></a>
                </p>

                <p>
                  Pocketbase
                  <span
                    v-if="this.pocketbase == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                  <a
                    type="button"
                    href="http://zimmermatic"
                    target="_blank"
                    class="bi bi-box-arrow-up-right mx-2"
                  ></a>
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
                <p>
                  nginx
                  <span
                    v-if="this.nginx == 200"
                    class="badge rounded-pill bg-success"
                    >Online</span
                  >
                  <span v-else class="badge rounded-pill bg-danger"
                    >Offline</span
                  >
                  <a
                    type="button"
                    href="http://zimmermatic:81"
                    target="_blank"
                    class="bi bi-box-arrow-up-right mx-2"
                  ></a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4">
            <div class="card h-100">
              <div class="row justify-content-center">
                <div class="col-lg-4">
                  <div class="row">
                    <button class="btnIcon" @click="send_fetch('UP', 'Bett')">
                      <i class="fas fa-chevron-up fa-5x"></i>
                    </button>
                  </div>
                  <div class="row">
                    <button class="btnIcon" @click="send_fetch('DOWN', 'Bett')">
                      <i class="fas fa-chevron-down fa-5x"></i>
                    </button>
                  </div>
                </div>
                <div class="col-lg-3">
                  <div class="row">
                    <button
                      class="btnIcon"
                      @click="send_fetch('UP', 'Schreibtisch')"
                    >
                      <i class="fas fa-chevron-up fa-5x"></i>
                    </button>
                  </div>
                  <div class="row">
                    <button
                      class="btnIcon"
                      @click="send_fetch('DOWN', 'Schreibtisch')"
                    >
                      <i class="fas fa-chevron-down fa-5x"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
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
      nginx: 0,
      pocketbase: 0,
      pi_info: {
        cpu_si: {},
        memory: {},
        cpu_temp: {},
        load: {},
        disk: [{}],
      },
      mem_use: 0,
      avg_temp_info: {
        avg_temperature: 0,
        avg_humidity: 0,
      },
      container: [{}],
      running_container: 0,
      timer: null,
    };
  },
  components: {
    Navbardark,
    LED,
    LIGHT,
  },
  methods: {
    async get_state(ip) {
      let res = await axios.get(ip).then((response) => response.status);
      return res;
    },
    async get_system_info() {
      let res = await axios
        .get("http://zimmermatic:3443/api/os_info")
        .then((response) => response);
      this.pi_info = res.data;
      this.backend = res.status;
      this.container = res.data.container;
      this.mem_use = (
        (this.pi_info.memory.free / this.pi_info.memory.used) *
        100
      ).toFixed(2);

      for (let i = 0; i < this.container.length; i++) {
        if (this.container[i].State == "running") {
          this.running_container += 1;
        }
        switch (this.container[i].Names[0]) {
          case "/emqx":
            if (this.container[i].State == "running") {
              this.emqx = 200;
            }
            break;
          case "/portainer":
            if (this.container[i].State == "running") {
              this.portainer = 200;
            }
            break;
          case "/zima_mongo":
            if (this.container[i].State == "running") {
              this.mongo = 200;
            }
            break;
          case "/pocketase":
            if (this.container[i].State == "running") {
              this.pocketbase = 200;
            }
            break;
          case "/nginx_app_1":
            if (this.container[i].State == "running") {
              this.nginx = 200;
            }
            break;
          default:
            break;
        }
      }
    },
    send_fetch(pDirection, shutter_spot) {
      console.log("Fetch Rolladen: " + pDirection);
      axios.post(IP + "/api/Rolladen", { direction: pDirection });
    },
    async get_avg_tmp() {
      this.avg_temp_info = await axios.get(IP + "/api/averageTemp").then((response) => response.data);
    },
  },
  async mounted() {
    this.get_avg_tmp();
    try {
      await this.get_system_info();
    } catch (error) {
      console.log("backend unavailable", error);
    }
    this.openhab = await this.get_state("http://192.168.0.138:8080/rest/items");
    this.timer = setInterval(() => {
      this.get_avg_tmp();
      this.get_system_info();
    }, 10000);
  },
};
</script>

<style scoped>
#rowout {
  display: flex;
  justify-content: center;
}

.bi-box-arrow-up-right {
  font-size: 12px;
}
</style>
