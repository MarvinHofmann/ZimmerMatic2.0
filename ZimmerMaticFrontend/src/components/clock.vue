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
        date: new Date().toLocaleString("de-DE", {timeZone: 'Europe/Berlin', weekday: "long", year: 'numeric', month: "long", day: "2-digit"})
      }
    },
    beforeDestroy() {
      // prevent memory leak
      clearInterval(this.interval)
    },
    created() {
      // update the time every second
      this.interval = setInterval(() => {
        // Concise way to format time according to system locale.
        // In my case this returns "3:48:00 am"
        this.time = Intl.DateTimeFormat(navigator.language, {
          hour: 'numeric',
          minute: 'numeric',
          second: 'numeric'
        }).format()
      }, 1000)
    }
  }
</script>