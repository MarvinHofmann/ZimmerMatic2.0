<template>
<router-view></router-view>  
</template>

<script setup>

</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
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
