<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
       <router-link
              :to="'/'"
              id="btn"
              class="navbar-brand"
              active-class="active"
              >ZimmerMatic by MH</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
      <i class="fas fa-caret-square-down fa-lg "></i>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link
              :to="'/temperatur'"
              id="btn"
              class="nav-link"
              active-class="active"
              >Temperatur</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="'/licht'"
              id="btn"
              class="nav-link"
              active-class="active"
              >Lampen</router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="'/leds'"
              id="btn"
              class="nav-link"
              active-class="active"
              >LEDs</router-link>
          </li>
          <li class="nav-item">
             <router-link
              :to="'/heizung'"
              id="btn"
              class="nav-link"
              active-class="active"
              >Heizung</router-link>
          </li>
          <li class="nav-item">
             <router-link
              :to="'/rolladen'"
              id="btn"
              class="nav-link"
              active-class="active"
              >Rolladen</router-link>
          </li>
          <li class="nav-item">
             <router-link
              :to="'/drucker'"
              id="btn"
              class="nav-link"
              active-class="active"
              >3D-Drucker</router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="collapse" id="navbarToggleExternalContent">
      <div class="bg-dark p-4">
        <h5 class="text-white h4">Temperaturüberwachung</h5>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "navbardark",
  props: ["active"],
  async mounted() {
    console.log(this.$route.name);
  },
  data() {},
  beforeMount() {},
  methods: {},
};
</script>

<style>
</style>
