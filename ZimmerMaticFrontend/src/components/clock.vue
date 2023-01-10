<template>
  <div :class="this.date_style">{{ this.date }}</div>
  <div :class="this.clock_style">{{ this.time }}</div>
</template>
<script>
export default {
  props: ["date_style", "clock_style"],
  data() {
    return {
      interval: null,
      time: null,
      date: new Date().toLocaleString("de-DE", { timeZone: "Europe/Berlin", weekday: "long", year: "numeric", month: "long", day: "2-digit" }),
    };
  },
  methods: {
    getTime() {
      this.time = Intl.DateTimeFormat(navigator.language, {
        hour: "numeric",
        minute: "numeric",
      }).format();
    },
  },
  beforeUnmount() {
    // prevent memory leak
    clearInterval(this.interval);
  },
  created() {
    this.getTime();
    this.interval = setInterval(() => {
      this.getTime();
    }, 5000);
  },
};
</script>
