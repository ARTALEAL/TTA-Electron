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
          :icon="isTimer ? 'stop' : 'play_arrow'"
          @click="handlePlay"
        />
      </div>
    </div>
    <div class="timer">00:00:00</div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NewEntry",
  data() {
    return {
      newActivity: "",
      isTimer: false,
    };
  },
  methods: {
    testi() {
      console.log(this.newActivity);
    },
    handlePlay() {
      this.isTimer = !this.isTimer;
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
