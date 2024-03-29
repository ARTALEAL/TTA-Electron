<template>
  <section class="new-entry">
    <div class="main-container">
      <div class="details">
        <q-input
          rounded
          outlined
          v-model="newActivity"
          @keyup.enter="newActivity ? handleStartTimer() : null"
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
    <div class="timer">{{ timer }}</div>
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
    handleStartTimer() {
      if (this.isTimerRun) {
        return;
      }
      this.isTimerRun = true;
      window.myApp.startTimer(this.newActivity);
    },
    handleStopTimer() {
      this.isTimerRun = false;
      window.myApp.stopTimer();
      this.time = 0;
      this.newActivity = "";
    },
  },
  created() {
    window.myApp.subscribeForTimer((_, data) => {
      this.isTimerRun = true;
      this.time = data.time;
      this.newActivity = data.title;
    });
  },
  computed: {
    timer: function () {
      const date = new Date(0);
      date.setSeconds(this.time);
      return date.toISOString().substring(11, 19);
    },
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
