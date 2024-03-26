<template>
  <section class="new-entry">
    <div class="main-container">
      <div class="details">
        <q-input
          rounded
          outlined
          v-model="newActivity"
          @change="testi"
          label="Новая активность"
        />
      </div>
      <div class="actions">
        <q-btn
          class="play-button"
          size="20px"
          round
          color="primary"
          :disable="newActivity ? false : true"
          :icon="isTimerRun ? 'stop' : 'play_arrow'"
          @click="isTimerRun ? handleStopTimer() : handleStartTimer()"
        />
      </div>
    </div>
    <div class="timer">{{ time }}</div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NewEntry",
  data() {
    return {
      newActivity: "",
      isTimerRun: false,
      time: 0,
    };
  },
  methods: {
    testi() {
      console.log(this.newActivity);
    },
    handleStartTimer() {
      console.log("start");
      this.isTimerRun = true;
      window.myApp.startTimer();
    },
    handleStopTimer() {
      console.log("stop");
      this.isTimerRun = false;
      window.myApp.stopTimer();
    },
  },
  created() {
    window.myApp.subscribeForTimer((_, data) => {
      this.isTimerRun = true;
      this.time = data.time;
    });
  },
});
</script>

<style scoped>
.new-entry {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 10px;
  border-bottom: 1px solid #f0f0f0;
}

.main-container {
  display: flex;
  align-items: center;
}

.main-container .details {
  flex: 2;
}

.main-container .actions {
  flex: 1;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.timer {
  margin-top: 20px;
  text-align: center;
  font-size: 30px;
}
</style>
