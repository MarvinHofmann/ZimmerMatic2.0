<template>
  <navbardark></navbardark>
  <main class="px-3 pt-3">
    <div class="container-fluid pt-3">
      <otaFilesTable></otaFilesTable>
      <otaTableESP></otaTableESP>
      
    </div>
  </main>
</template>

<script>
import navbardark from "../components/navbardark.vue";
import otaTableESP from "../components/OTA/otaTableESP.vue";
import otaFilesTable from "../components/OTA/otaFilesTable.vue";

export default {
  components: {
    navbardark,
    otaFilesTable,
    otaTableESP,
  },
  data() {
    return {
      
    };
  },
  methods: {
    
  },
  async mounted() {},
};
</script>

<style scoped></style>
