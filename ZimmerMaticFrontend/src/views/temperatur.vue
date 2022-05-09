<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
            <h1 class="display-3">Temperatur</h1>
          </div>
          <Temp-kachel :spot="'Bett'" :imgProp="'/Bett.png'"></Temp-kachel>
          <Temp-kachel :spot="'Couch'" :imgProp="'/Couch.png'"></Temp-kachel>
          <Temp-kachel :spot="'Schreibtisch'" :imgProp="'/Schreibtisch.png'"></Temp-kachel>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
import Navbardark from "../components/navbardark.vue";
import TempKachel from "../components/temperaturKachel.vue";
export default {
  components: {
    Navbardark,
    TempKachel,
  },
  methods: {},
  mounted() {},
};
</script>

<style scoped>
.container-fluid{
  width: 90%;
}
</style>
