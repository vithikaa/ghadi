<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="q-gutter-md row items-start justify-center">
        <div>
          <p class="text-caption text-center">Current System Time</p>
          <p class="text-h4 text-center">{{ systemTime }}</p>
        </div>
      </div>
      <div class="q-gutter-md row items-start">
        <q-date v-model="model" mask="YYYY-MM-DD HH:mm:ss" color="purple" />
        <q-time v-model="model" mask="YYYY-MM-DD HH:mm:ss" color="purple" format24h with-seconds />
      </div>
      <div class="q-pa-md row items-start justify-center">
        <q-btn color="primary" label="Reset Time" @click="resetTime" />
      </div>
    </div>
  </q-page>
</template>

<script>
import moment from "moment";
import NtpTimeSync from "ntp-time-sync";
import setDateTime from "src/lib/setDateTime";

const timeSync = NtpTimeSync.getInstance({
  servers: [
    "time1.google.com",
    "time2.google.com",
    "time3.google.com",
    "time4.google.com"
  ]
});

export default {
  name: "PageIndex",

  data() {
    return {
      timerID: null,
      systemTime: null,
      model: new moment().format("YYYY-MM-DD HH:mm:ss")
    };
  },

  watch: {
    model(newDate, oldDate) {
      setDateTime(new Date(newDate), { useSudo: true });
      console.log(newDate);
    }
  },

  mounted() {
    this.timerID = setInterval(this.updateTime, 1000);
    console.log(setTime);
  },

  methods: {
    updateTime() {
      this.systemTime = new moment().format("MMM DD, YYYY HH:mm:ss");
    },
    resetTime() {
      const vm = this;
      timeSync.getTime().then(function(result) {
        vm.model = new moment(result.now).format("YYYY-MM-DD HH:mm:ss");
      });
    }
  },

  destroyed() {
    clearInterval(this.timerID);
  }
};
</script>
