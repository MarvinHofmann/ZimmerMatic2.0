<template>
  <Transition>
    <div :class="['alert', this.type]" role="alert" v-if="this.show">
      {{ this.message }}
      <hr v-if="this.show_expanded" />
      <p v-if="this.show_expanded" class="mb-0">{{ this.message_expand }}</p>
    </div>
  </Transition>
</template>

<script>
export default {
  props: {
    type: {
        type: String,
        default: "alert-danger"
    },
    message: {
        type: String,
        default: "Alert Text"
    },
    ttl: {
        type: Number,
        default: 2000
    },
    show_expanded: {
        type: Boolean,
        deafult: false,
        required: false
    },
    message_expand: {
        type: String,
        deafult: "Expanded Alert Text",
        required: false
    }
  },
  emits: ["done"],
  computed: {
    style() {
      return {};
    },
  },
  components: {},
  data() {
    return {
        show: false
    };
  },
  methods: {
    /**
     * Shows the alert for the given amount of time
     */
    show_alert(){
        console.log("SHOW ALERT");
        this.show = true
        setTimeout(() => this.show = false, this.ttl);  
    }
  },
  async mounted() {},
};
</script>

<style scoped></style>
