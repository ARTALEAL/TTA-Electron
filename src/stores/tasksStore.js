import { defineStore } from "pinia";

export const useTasksStore = defineStore("tasks", {
  state: () => ({
    tasks: [],
    totalMinutes: 0,
  }),
  getters: {
    getTasks: (state) => state.tasks,
    getMinutes: (state) => state.totalMinutes,
  },
  actions: {
    setTasks(data) {
      this.tasks = data;
    },
    deleteItem(id) {
      this.tasks = this.tasks.filter((el) => el.id !== id);
    },
    editTask(data) {
      this.tasks.forEach((el) => {
        if (el.id === data.id) {
          el.description = data.description;
        }
      });
    },
    setMinutes(data) {
      this.totalMinutes = data;
    },
  },
});
