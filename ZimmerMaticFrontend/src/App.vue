<template>
  <router-view></router-view>
</template>

<script setup>

</script>

<style>
html{
  background: #212529;
}

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  background: #212529;
  min-height: 100vh;
}

/* Basic Transition styling */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.4s ease-out;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
