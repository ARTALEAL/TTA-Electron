<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useTasksStore } from "./stores/tasksStore";
import { useToDoStore } from "./stores/todoStore";

export default defineComponent({
  name: "App",
  data() {
    return {
      taskStore: useTasksStore(),
      todosStore: useToDoStore(),
    };
  },
  created() {
    window.myApp.getEntries((_, data) => console.log(data.entries));
    window.myApp.getTodos((_, data) => console.log(data.todos));
    window.myApp.getEntries((_, data) => this.taskStore.setTasks(data.entries));
    window.myApp.getEntries((_, data) => this.todosStore.setTasks(data.todos));
  },
});
</script>
