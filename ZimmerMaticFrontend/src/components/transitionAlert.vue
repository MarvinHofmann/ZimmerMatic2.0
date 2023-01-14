<template>
  <Transition>
    <div class="alert alert-danger" role="alert" v-if="this.show && this.type == 'danger'">{{ this.message }}</div>
  </Transition>
  <Transition>
    <div class="alert alert-success" role="alert" v-if="this.show && this.type == 'success'">{{ this.message }}</div>
  </Transition>
  <Transition>
    <div class="alert alert-warning" role="alert" v-if="this.show && this.type == 'warning'">{{ this.message }}</div>
  </Transition>
  <Transition>
    <div class="alert alert-primary" role="alert" v-if="this.show && this.type == 'primary'">{{ this.message }}</div>
  </Transition>
</template>

<script>
export default {
  props: ["show", "type", "message", "ttl"],
  emits: ["done"],
  components: {},
  data() {
    return {
    };
  },
  methods: {
  },
  async mounted() {},
  watch: { 
      	show: function(newVal, oldVal) { // watch it
            setTimeout(() => (this.$emit("done")), this.ttl);
        }
      }
};
</script>

<style scoped></style>
