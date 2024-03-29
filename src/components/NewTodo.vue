<template>
  <section class="new-entry">
    <div class="main-container">
      <div class="new-todo">
        <q-input
          class="new-todo-input"
          rounded
          outlined
          v-model="newActivity"
          @keyup.enter="newActivity ? handleCreateTodo() : null"
          label="Новая задача"
        />
      </div>
      <div class="new-todo-submit-container">
        <q-btn
          color="primary"
          label="Добавить задачу"
          @click="handleCreateTodo"
          :disable="!newActivity ? true : false"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "NewTodo",
  data() {
    return {
      newActivity: "",
    };
  },
  methods: {
    handleCreateTodo() {
      console.log("created", this.newActivity);
      this.newActivity = "";
    },
  },
  computed: {},
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
  flex-direction: column;
  gap: 20px;
}
.new-todo-submit-container {
  align-self: center;
}
</style>
