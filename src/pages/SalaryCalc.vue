<template>
  <section class="calc-page">
    <h2 class="main-title">Калькулятор зарплаты</h2>
    <form class="calc-form">
      <q-input
        rounded
        outlined
        label="Введите отработанные минуты"
        v-model="minutes"
        type="number"
      />
      <q-input
        rounded
        outlined
        label="Введите ставку в час"
        v-model="rate"
        type="number"
      />
      <p v-if="totalMinutes">Ваши минуты из трекера: {{ totalMinutes }}</p>
      <p v-if="total" class="income">Вы заработали: {{ total }}</p>
    </form>
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useTasksStore } from "../stores/tasksStore";
export default defineComponent({
  name: "SalaryCalc",
  components: {},
  data() {
    return {
      minutes: null,
      rate: null,
      result: null,
      tasksStore: useTasksStore(),
      totalMinutes: 0,
    };
  },
  computed: {
    total: function () {
      if (this.minutes && this.rate) {
        this.result = ((this.minutes / 60) * this.rate).toFixed(2);
        return this.result;
      }
    },
  },
  mounted() {
    this.totalMinutes = Math.round(this.tasksStore.getMinutes / 60);
  },
});
</script>

<style>
.calc-page {
  padding: 20px 10px;
}

.main-title {
  font-size: 20px;
  text-align: center;
  line-height: 1em;
  font-weight: 800;
}
.calc-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.income {
  font-weight: 800;
  text-align: center;
  font-size: 20px;
}
</style>
