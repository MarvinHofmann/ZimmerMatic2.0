<template>
  <div>
    <navbardark></navbardark>
    <main class="px-3">
      <div class="container mt-4">
        <div class="row">
          <div class="col-lg-12 mb-3 text-black text-center">
            <h1 class="display-3">Heizungssteuerung</h1>
          </div>
          <Heizung :spot="'HZF'"></Heizung>
          <Heizung :spot="'HZFen'"></Heizung>
        </div>
      </div>
    </main>
    <h1></h1>
  </div>
</template>

<script>
import Navbardark from "../components/navbardark.vue";
import Heizung from "../components/HeizungKachel.vue";
export default {
  components: {
    Navbardark,
    Heizung,
  },
  methods: {},
  mounted() {},
};
</script>

<style></style>
