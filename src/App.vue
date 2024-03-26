<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";
import { useTasksStore } from "./stores/tasksStore";

export default defineComponent({
  name: "App",
  data() {
    return {
      taskStore: useTasksStore(),
    };
  },
  created() {
    window.myApp.getEntries((_, data) => console.log(data.entries));
    window.myApp.getEntries((_, data) => this.taskStore.setTasks(data.entries));
  },
});
</script>
