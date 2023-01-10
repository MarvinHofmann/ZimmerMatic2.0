<template>
  <nav class="navbar navbar-expand-lg navbar-light p-2 bg-custom">
    <div class="container-fluid">
      <a class="navbar-brand d-block d-lg-none" href="#">
        <img src="../../public/favicon.ico" class="ms-3 mt-0 p-0" alt="" height="35" id="image" @click="change_to_dash()" />
      </a>
      <button
        class="navbar-toggler toggle-button"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i class="bi bi-list toggle-icon" style="font-size: 1.5rem; color: white; border-color: white"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item">
            <router-link :to="'/'" id="btn" class="nav-link" active-class="active"> Dashboard </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/temperatur'" id="btn" class="nav-link" active-class="active"> Temperatur </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/licht'" id="btn" class="nav-link" active-class="active"> Licht </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/leds'" id="btn" class="nav-link" active-class="active"> LEDs </router-link>
          </li>
          <li class="nav-item d-none d-lg-block">
            <a class="nav-link mx-2" href="#" @click="change_to_dash()">
              <img src="../../public/favicon.ico" height="40" />
            </a>
          </li>
          <li class="nav-item">
            <router-link :to="'/heizung'" id="btn" class="nav-link" active-class="active"> Heizung </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/rolladen'" id="btn" class="nav-link" active-class="active"> Rolladen </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/drucker'" id="btn" class="nav-link" active-class="active"> Drucker </router-link>
          </li>
          <li class="nav-item dropdown">
            <a
              class="nav-link mx-2 dropdown-toggle"
              href="#"
              id="navbarDropdownMenuLink"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{this.store.user.username}}
            </a>
            <ul class="dropdown-menu py-1" aria-labelledby="navbarDropdownMenuLink">
              <li>
                <router-link :to="'/einstellungen'" id="btn" class="dropdown-item pt-0">Einstellungen </router-link>
              </li>
              <li v-if="this.store.user.role == 'Admin'">
                <router-link :to="'/user'" id="btn" class="dropdown-item m-0">User </router-link>
              </li>
              <li>
                <hr class="dropdown-divider m-0" />
              </li>
              <li>
                <a id="btn" class="dropdown-item" type="button" @click="logout">Ausloggen </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth.store";
export default {
  components: {},
  setup() {
    const store = useAuthStore()
    return {
      store
    }
  },
  data() {
    return {};
  },
  methods: {
    change_to_dash() {
      this.$router.push("/");
    },
    logout(){
      this.$router.push('/login');
      this.store.logout()
    }
  },
  mounted() {},
};
</script>

<style scoped>
.nav-link {
  color: #05386b !important;
}
.navbar-nav .show > .nav-link,
.navbar-nav .nav-link.active {
  padding-bottom: 0;
  border-bottom: 3px solid rgba(82, 115, 191, 0.5) !important;
}
#avatar:hover {
  opacity: 60%;
}
#image:hover {
  opacity: 60%;
  cursor: pointer;
}

@media screen and (min-width: 992px) {
  .nav-item {
    color: #05386b;
    line-height: 40px;
    margin-left: 5px;
    margin-right: 5px;
    font-weight: 420;
  }
}

.bg-custom {
  background-color: rgba(194, 212, 249, 0.5) !important;
  
}
</style>
