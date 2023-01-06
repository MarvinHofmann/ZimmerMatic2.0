
<template>
  <nav class="navbar navbar-expand-lg bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
                <img src="../../public/favicon.ico" class="ms-3 mt-0 p-0" alt="" height="35" id="image" @click="change_to_dash()">
            </a>
          <button class="navbar-toggler toggle-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
              <i class="bi bi-list toggle-icon" style="font-size: 1.5rem; color: white; border-color: white"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                      <router-link :to="'/'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-house"></i> Dashboard
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/temperatur'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-thermometer"></i>Temperatur
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/licht'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-lamp"></i> Licht
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/leds'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-lightbulb"></i> LEDs
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/heizung'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-thermometer-snow"></i> Heizung
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/rolladen'" id="btn" class="nav-link" active-class="active">
                        <i class="bi bi-shop-window"></i> Rolladen
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link :to="'/drucker'" id="btn" class="nav-link" active-class="active"><i class="bi bi-printer"></i> Drucker
                      </router-link>
                  </li>
              </ul>
              <div class="d-flex flex-shrink-0 dropdown p-2">
                  <a href="#" class="d-block link-light text-decoration-none dropdown-toggle" data-bs-toggle="dropdown"
                      id="avatar" aria-expanded="false">
                      <img src="https://robohash.org/7ae5b4a9231acc4c57593f4114870365?set=set4&bgset=&size=500x500"
                          alt="mdo" width="38" height="38" class="rounded-circle">
                  </a>
                  <ul class="dropdown-menu text-small shadow">
                      <li>
                          <router-link :to="'/settings'" id="btn" class="dropdown-item">Einstellungen
                          </router-link>
                      </li>
                      <li>
                          <hr class="dropdown-divider">
                      </li>
                      <li>
                          <router-link :to="'/login'" id="btn" class="dropdown-item">Ausloggen
                          </router-link>
                      </li>
                  </ul>
              </div>
              <div class="fs-6 pe-5 text-light">
                  {{ this.user }}
              </div>
          </div>
      </div>
  </nav>
</template>

<script>
export default {
  components: {
  },
  data() {
      return {
          user: "Marvin",
      }
  },
  methods: {
      change_to_dash() {
          this.$router.push("/")
      }
  },
  mounted() {
      this.user = "Marvin"
  },
};
</script>

<style scoped>
.nav-link {
  color: #c9c8c88c !important
}
.navbar-nav .show>.nav-link,
.navbar-nav .nav-link.active {
  color: white !important
}
#avatar:hover {
  opacity: 60%;
}
#image:hover {
    opacity: 60%;
    cursor: pointer;
}
</style>