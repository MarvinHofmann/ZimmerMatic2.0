<template>
  <div>
      <navbardark></navbardark>
    <main class="px-3">
      <div class="container-fluid mt-4">
        <div class="row">
          <div class="col-lg-12 mx-auto mb-3 text-black text-center">
            <h1 class="display-3">Dashboard</h1>
          </div>
          <div class="row" id="rowout">
          <LED :spot="'Couch'" :mqtt_topic="'colorCouch'" :spotNum="'2'"></LED>
          <LED :spot="'Dart'" :mqtt_topic="'colorKamin'" :spotNum="'1'"></LED>
          <LED :spot="'Uhr'" :mqtt_topic="'colorUhr'" :spotNum="'3'"></LED>
          <LED :spot="'Marvin'" :mqtt_topic="'colorMarvin'" :spotNum="'4'"></LED>
          <LED :spot="'Emely'" :mqtt_topic="'colorEmely'" :spotNum="'5'"></LED>
          </div>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
import Navbardark from '../components/navbardark.vue';
import LED from '../components/LEDStatusKachel.vue';
export default {

  components: {
    Navbardark,
    LED
  },
  methods: {
    
  },
  mounted() {
  },
};
</script>

<style>
#rowout{
  display: flex;
  justify-content: center;
}
</style>