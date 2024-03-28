import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
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
