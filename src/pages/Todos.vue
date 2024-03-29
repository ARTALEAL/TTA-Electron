<template>
  <NewTodoVue />
  <TodosListVue />
</template>

<script>
import NewTodoVue from "src/components/NewTodo.vue";
import { defineComponent } from "vue";
import TodosListVue from "src/components/TodosList.vue";

export default defineComponent({
  name: "TodosPage",
  components: { NewTodoVue, TodosListVue },
});
</script>

<style scoped>
.main-title {
  font-size: 20px;
  text-align: center;
  line-height: 1em;
}
</style>
