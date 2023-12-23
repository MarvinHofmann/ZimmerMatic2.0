<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-3">
        <div class="row">
          <div class="col-lg-3 mt-3">
            <div class="card h-100 p-3">
              <div class="row justify-content-center">
                <div class="col-lg-6 text-center">
                  <h3 class="p-0 m-0 mt-3">Bett</h3>
                  <button class="btn btn-outline-secondary btnIcon" @click="send_fetch('UP', 'Bett')">
                    <i class="fas fa-chevron-up fa-2x text-success"></i>
                  </button>
                  <button class="btn btn-outline-secondary btnIcon" @click="send_fetch('DOWN', 'Bett')">
                    <i class="fas fa-chevron-down fa-2x text-success"></i>
                  </button>
                  <p class="text-muted">Aktuell: {{ this.shutter_state_bett }}</p>
                </div>
                <div class="col-lg-6 text-center">
                  <h3 class="p-0 m-0 mt-3">Büro</h3>
                  <button class="btn btn-outline-secondary btnIcon" @click="send_fetch('UP', 'Schreibtisch')">
                    <i class="fas fa-chevron-up fa-2x text-success"></i>
                  </button>
                  <button class="btn btn-outline-secondary btnIcon" @click="send_fetch('DOWN', 'Schreibtisch')">
                    <i class="fas fa-chevron-down fa-2x text-success"></i>
                  </button>
                  <p class="text-muted">Aktuell: {{ this.shutter_state_schreibtisch }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-7 mt-3">
            <div class="card card-body h-100">
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
                    <LED :spot="'Couch'" :mqtt_topic="'colorCouch'" :spotNum="'2'"></LED>
                    <LED :spot="'Dart'" :mqtt_topic="'colorKamin'" :spotNum="'1'"></LED>
                    <LED :spot="'Uhr'" :mqtt_topic="'colorUhr'" :spotNum="'3'"></LED>
                    <LED :spot="'Marvin'" :mqtt_topic="'colorMarvin'" :spotNum="'4'"></LED>
                    <LED :spot="'Emely'" :mqtt_topic="'colorEmely'" :spotNum="'5'"></LED>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-2 mt-3">
            <div class="card h-100">
              <div class="card-body text-center mt-5">
                <div class="display-6 p-2">
                  <i class="bi bi-thermometer"></i>
                  {{ this.avg_temp_info.avg_temperature }}°C
                </div>
                <hr class="border mt-2" />
                <div class="display-6 p-2 pt-0">
                  <i class="bi bi-droplet"></i>
                  {{ this.avg_temp_info.avg_humidity }}%
                </div>
              </div>
              <div class="card-footer text-center">
                <clock :clock_style="'display-5'" :date_style="'text-muted'"></clock>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6 mt-3">
            <div class="card card-body h-100">
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
                    <LIGHT :spot="'Bett Links'" :name="'BL'" :uid="'tradfri:0220:gw4491603198ed:65537'"></LIGHT>
                    <LIGHT :spot="'Bett Rechts'" :name="'BR'" :uid="'tradfri:0220:gw4491603198ed:65538'"></LIGHT>
                    <LIGHT :spot="'Basteltisch'" :name="'BT'" :uid="'tradfri:0220:gw4491603198ed:65543'"></LIGHT>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-2 mt-3">
            <div class="card h-100">
              <div class="card-header">Services</div>
              <div class="card-body">
                <p>
                  Openhab
                  <span v-if="this.openhab == 200" class="badge rounded-pill bg-success">Online</span>
                  <span v-else class="badge rounded-pill bg-danger">Offline</span>
                  <a type="button" href="http://zimmermatic:8080" target="_blank" class="bi bi-box-arrow-up-right mx-2"></a>
                </p>
                <p>
                  Portainer
                  <span v-if="this.portainer == 200" class="badge rounded-pill bg-success">Online</span>
                  <span v-else class="badge rounded-pill bg-danger">Offline</span>
                  <a type="button" href="http://zimmermatic:9000" target="_blank" class="bi bi-box-arrow-up-right mx-2"></a>
                </p>
                <p>
                  EMQX
                  <span v-if="this.emqx == 200" class="badge rounded-pill bg-success">Online</span>
                  <span v-else class="badge rounded-pill bg-danger">Offline</span>
                  <a type="button" href="http://zimmermatic:18083" target="_blank" class="bi bi-box-arrow-up-right mx-2"></a>
                </p>
                <p>
                  MongoDB
                  <span v-if="this.mongo == 200" class="badge rounded-pill bg-success">Online</span>
                  <span v-else class="badge rounded-pill bg-danger">Offline</span>
                </p>
                <p>
                  nginx
                  <span v-if="this.nginx == 200" class="badge rounded-pill bg-success">Online</span>
                  <span v-else class="badge rounded-pill bg-danger">Offline</span>
                  <a type="button" href="http://zimmermatic:81" target="_blank" class="bi bi-box-arrow-up-right mx-2"></a>
                </p>
              </div>
            </div>
          </div>
          <div class="col-lg-4 mt-3">
            <div class="card h-100">
              <div class="card-header">Serverstatus</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-lg-6">
                    <p class="text-muted">
                      Backend
                      <span v-if="this.backend == 200" class="badge rounded-pill bg-success">Online</span>
                      <span v-else class="badge rounded-pill bg-danger">Offline</span>
                    </p>
                    <p class="text-muted">
                      Systemload: <b>{{ this.pi_info.load.avgLoad }}</b>
                    </p>
                    <p class="text-muted">
                      RAM: <b>{{ this.mem_use }} % </b>
                    </p>
                    <p class="text-muted">
                      Speicherbelegung: <b>{{ this.pi_info.disk[0].use }}% </b>
                    </p>
                    <p v-if="this.pi_info.cpu_temp.main >= 50" class="text-warning">
                      Temperatur: <b> {{ this.pi_info.cpu_temp.main }}°C </b>
                    </p>
                    <p v-else-if="this.pi_info.cpu_temp.main > 55" class="text-muted">
                      Temperatur: <b> {{ this.pi_info.cpu_temp.main }}°C </b>
                    </p>
                    <p v-else class="text-muted">
                      Temperatur: <b> {{ this.pi_info.cpu_temp.main }}°C </b>
                    </p>
                  </div>
                  <div class="col-lg-6">
                    <p class="text-muted">
                      Laufende Container: <b>{{ this.running_container }} </b>
                    </p>
                    <p class="text-muted">
                      Anzahl Container: <b>{{ this.container.length }} </b>
                    </p>
                    <p class="text-muted">
                      Homematic Bridge
                      <span v-if="this.homematic" class="badge rounded-pill bg-success">Online</span>
                      <span v-else class="badge rounded-pill bg-danger">Offline</span>
                    </p>
                    <p class="text-muted">
                      Tradfri Gateway
                      <span v-if="this.tradfri" class="badge rounded-pill bg-success">Online</span>
                      <span v-else class="badge rounded-pill bg-danger">Offline</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row mb-5">
          <div class="col-lg-12 mt-3">
            <div class="card">
              <div class="card-header">Cron Jobs</div>
              <div class="card-body">
                <cronjobs></cronjobs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const IP = import.meta.env.VITE_SERVER_IP;
import Navbardark from "../components/navbardark.vue";
import LED from "../components/LEDStatusKachel.vue";
import LIGHT from "../components/LampeStatusKachel.vue";
import clock from "../components/clock.vue";
import axios from "axios";
import cronjobs from "../components/cronjobs.vue";
export default {
  components: {
    Navbardark,
    LED,
    LIGHT,
    clock,
    cronjobs,
  },
  data() {
    return {
      openhab: 0,
      portainer: 0,
      emqx: 0,
      mongo: 0,
      backend: 0,
      nginx: 0,
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
      homematic: false,
      tradfri: false,
      shutter_state_bett: "ZU",
      shutter_state_schreibtisch: "ZU",
    };
  },
  methods: {
    async get_state(ip) {
      let res = await axios.get(ip).then((response) => response.status);
      return res;
    },
    async get_system_info() {
      this.running_container = 0;
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
      axios.post(IP + "/api/Rolladen", { direction: pDirection });
      if (shutter_spot == "Bett") {
        this.shutter_state_bett = "Fährt ...";
      } else {
        this.shutter_state_schreibtisch = "Fährt ...";
      }
    },
    async get_avg_tmp() {
      this.avg_temp_info = await axios
        .get(IP + "/api/averageTemp")
        .then((response) => response.data);
    },
    async get_homematic_bridge() {
      let res = await axios
        .get(
          "http://192.168.0.138:8080/rest/things/homematic:bridge:3014F711A0001F58A9A70A7A/status",
          {
            auth: {
              username: "MH",
              password: "1010",
            },
          }
        )
        .then((response) => response.data);
      res.status == "OFFLINE" ? (this.homematic = false) : (this.homematic = true);
    },
    async get_tradfri_gateway() {
      let res = await axios
        .get(
          "http://192.168.0.138:8080/rest/things/tradfri:gateway:gw4491603198ed/status",
          {
            auth: {
              username: "MH",
              password: "1010",
            },
          }
        )
        .then((response) => response.data);
      res.status == "OFFLINE" ? (this.tradfri = false) : (this.tradfri = true);
    },
    async get_shutter_state() {
      this.shutter_state_bett = await axios
        .post(IP + "/api/Rolladen/state", {
          spot: "stateBett",
        })
        .then((response) => response.data);
      this.shutter_state_schreibtisch = await axios
        .post(IP + "/api/Rolladen/state", {
          spot: "stateSchreibtisch",
        })
        .then((response) => response.data);
    },
  },
  async mounted() {
    this.get_avg_tmp();
    this.get_homematic_bridge();
    this.get_tradfri_gateway();
    this.get_shutter_state();
    try {
      await this.get_system_info();
    } catch (error) {
      console.log("backend unavailable", error);
    }
    this.openhab = await this.get_state("http://192.168.0.138:8080/rest/items");
    this.timer = setInterval(() => {
      this.get_avg_tmp();
      this.get_system_info();
      this.get_homematic_bridge();
      this.get_tradfri_gateway();
      this.get_shutter_state();
    }, 10000);
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.timer);
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

.btnIcon {
  height: 75px;
  width: 75px;
  margin: 10px 10px 10px 10px;
}

hr {
  margin-top: -2%;
  color: #ffffff;
  background-color: #fbfbfb;
  border: 0;
  opacity: 0.75;
}
</style>
