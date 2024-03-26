import { defineStore } from "pinia";

export const useTasksStore = defineStore("counter", {
  state: () => ({
    tasks: [],
  }),
  getters: {
    getTasks: (state) => state.tasks,
  },
  actions: {
    setTasks(data) {
      this.tasks = data;
    },
  },
});
