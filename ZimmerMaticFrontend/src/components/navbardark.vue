
SCRIPT
<template>
  <MDBNavbar expand="lg" dark bg="dark" container>
    <MDBNavbarBrand href="#"><router-link
              :to="'/'"
              id="btn"
              active-class="active"
              >ZimmerMatic by MH</router-link></MDBNavbarBrand>
    <MDBNavbarToggler
      @click="collapse1 = !collapse1"
      target="#navbarSupportedContent"
    ></MDBNavbarToggler>
    <MDBCollapse v-model="collapse1" id="navbarSupportedContent">
      <MDBNavbarNav class="mb-2 mb-lg-0">
        <MDBNavbarItem to="/temperatur">
          Temperatur
        </MDBNavbarItem>
        <MDBNavbarItem to="licht">
          Lampen
        </MDBNavbarItem>
        <MDBNavbarItem to="/LEDs">
          LEDs
        </MDBNavbarItem>
        <MDBNavbarItem to="/heizung">
          Heizung
        </MDBNavbarItem>
        <MDBNavbarItem to="/rolladen">
          Rolladen
        </MDBNavbarItem>
        <MDBNavbarItem to="/drucker">
          3D-Drucker
        </MDBNavbarItem>
      </MDBNavbarNav>
    </MDBCollapse>
  </MDBNavbar>
</template>
<script>
  import {
    MDBBtn,
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBCollapse,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem
  } from 'mdb-vue-ui-kit';
  import { ref } from 'vue';
  export default {
    components: {
      MDBBtn,
      MDBNavbar,
      MDBNavbarToggler,
      MDBNavbarBrand,
      MDBNavbarNav,
      MDBNavbarItem,
      MDBCollapse,
      MDBDropdown,
      MDBDropdownToggle,
      MDBDropdownMenu,
      MDBDropdownItem
    },
    setup() {
      const collapse1 = ref(false);
      return {
        collapse1,
      }
    }
  };
</script>

<style>
#btn{
  text-decoration: none;
  color: White;
}
</style>
