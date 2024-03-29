import { defineStore } from "pinia";

export const useToDoStore = defineStore("todos", {
  state: () => ({
    todos: [],
  }),
  getters: {
    getTasks: (state) => state.todos,
  },
  actions: {
    setTasks(data) {
      this.todos = data;
    },
    setTask(data) {
      this.todos.push(data);
    },
    deleteItem(id) {
      this.todos = this.todos.filter((el) => el.id !== id);
    },
  },
});
