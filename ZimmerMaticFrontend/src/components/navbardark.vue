<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary bg-primary p-2">
    <div class="container">
      <a class="navbar-brand" href="#">
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
        <i class="bi bi-list toggle-icon"></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
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
          <li class="nav-item">
            <router-link :to="'/heizung'" id="btn" class="nav-link" active-class="active"> Heizung </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/rolladen'" id="btn" class="nav-link" active-class="active"> Rolladen </router-link>
          </li>
          <li class="nav-item">
            <router-link :to="'/drucker'" id="btn" class="nav-link" active-class="active"> Drucker </router-link>
          </li>
        </ul>
        <div class="d-flex flex-shrink-0 dropdown p-2">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <a id="btn" class="nav-link m-0 pb-0"> {{this.store.user.username}} </a>
            </li>
          </ul>
          <a href="#" class="d-block link-dark text-decoration-none dropdown-toggle avatar" data-bs-toggle="dropdown" id="avatar" aria-expanded="false">
            <img
              src="https://robohash.org/7ae5b4a9231acc4c57593f4114870365?set=set4&bgset=&size=500x500"
              alt="mdo"
              width="38"
              height="38"
              class="rounded-circle bg-light"
            />
          </a>
          <ul class="dropdown-menu py-1" aria-labelledby="navbarDropdownMenuLink">
            <li>
              <router-link :to="'/ota'" id="btn" class="dropdown-item pt-0">OTA </router-link>
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
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useAuthStore } from "../stores/auth.store";
export default {
  components: {},
  setup() {
    const store = useAuthStore();
    return {
      store,
    };
  },
  data() {
    return {};
  },
  methods: {
    change_to_dash() {
      this.$router.push("/");
    },
    logout() {
      this.$router.push("/login");
      this.store.logout();
    },
  },
  mounted() {},
};
</script>

<style scoped>
.navbar-nav .show > .nav-link,
.navbar-nav .nav-link.active {
  padding-bottom: 0;
  border-bottom: 3px solid rgba(82, 115, 191, 0.5) !important;
}

.avatar{
  margin-top: 5%;
  line-height: 40px;
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

</style>
