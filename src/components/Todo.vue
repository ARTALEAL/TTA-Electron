<template>
  <div class="activity">
    <div class="details">
      <h5 :class="status ? 'title done' : 'title'">{{ title }}</h5>
      <p class="description" @click="status ? null : (editPopup = true)">
        {{ newDescription ? newDescription : description }}
      </p>
      <span v-if="status" class="done">Готово!</span>
      <q-dialog v-model="editPopup" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Введите описание</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              dense
              v-model="newDescription"
              autofocus
              @keyup.enter="handleEditDescription"
            />
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Отмена" @click="discardChanges" v-close-popup />
            <q-btn
              @click="handleEditDescription"
              flat
              label="Сохранить"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
    <div class="actions">
      <q-btn
        :icon="status ? 'edit' : 'done'"
        :color="status ? 'primary' : 'green'"
        @click="handleToggleDone"
      />
      <q-btn icon="delete" @click="handleDelete" color="red" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { useToDoStore } from "../stores/todoStore";
export default defineComponent({
  name: "Todo",
  props: {
    title: String,
    description: String,
    id: Number,
    isDone: Boolean,
  },
  data() {
    return {
      newDescription: "",
      editPopup: false,
      todoStore: useToDoStore(),
      status: this.$props.isDone,
    };
  },
  methods: {
    handleEditDescription() {
      const newData = {
        id: this.$props.id,
        description: this.newDescription
          ? this.newDescription
          : this.$props.description,
      };
      window.myApp.editTodoDescription(newData);
      this.todoStore.editTodo(newData);
      this.$emit("editItem");
      this.editPopup = false;
    },
    discardChanges() {
      this.newDescription = "";
    },
    handleDelete() {
      const id = this.$props.id;
      window.myApp.deleteTodo(id);
      this.todoStore.deleteItem(id);
      this.$emit("deleteTodo");
    },
    handleToggleDone() {
      this.status = !this.status;
      const data = {
        status: this.status,
        id: this.$props.id,
      };
      window.myApp.changeTodoStatus(data);
      this.todoStore.changeStatus(data);
    },
  },
});
</script>

<style scoped>
.activity {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #f0f0f0;
  padding: 20px 10px;
  position: relative;
}

.activity:hover {
  cursor: default;
  background-color: #f7f7f7;
  transition: background-color 0.4s ease;
}

.title {
  margin: 0;
}

.description {
  margin: 5px 0;
  color: #8a8a8a;
}

.description:hover {
  cursor: cell;
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 5px;
}
.actions {
  display: flex;
  gap: 5px;
}

.done {
  color: green;
}
</style>
