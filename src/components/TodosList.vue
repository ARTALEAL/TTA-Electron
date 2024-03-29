<template>
  <section class="activity-list">
    <div v-if="allTodos.length === 0" class="no-entries">Ещё нет задач</div>
    <Todo v-else v-for="todo in allTodos" :key="todo.id" />
  </section>
</template>

<script>
import { defineComponent } from "vue";
import { useToDoStore } from "../stores/todoStore";
import Todo from "../components/Todo.vue";
import { orderBy } from "lodash";
export default defineComponent({
  name: "TodosList",
  components: { Todo },
  emits: ["deleteItem"],
  data() {
    return {
      allTodos: [],
      todosStore: useToDoStore(),
    };
  },
  methods: {
    getTasks() {
      this.allTodos = orderBy(this.todosStore.getTasks, "createdAt", "desc");
    },
    deleteTask() {
      this.getTasks();
    },
  },
  created() {
    window.myApp.getTodos(
      (_, data) => (this.allTasks = orderBy(data.todos, "createdAt", "desc"))
    );
  },
  mounted() {
    this.getTasks();
  },
});
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
}
.no-entries {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  color: #a8a8a8;
}
</style>
