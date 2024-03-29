<template>
  <div class="activity">
    <div class="details">
      <h5 class="title">{{ title }}</h5>
      <p class="description" @click="editPopup = true">
        {{ newDescription ? newDescription : description }}
      </p>
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
  },
  data() {
    return {
      newDescription: "",
      editPopup: false,
      todoStore: useToDoStore(),
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
      window.myApp.deleteEntry(id);
      this.todoStore.deleteItem(id);
      this.$emit("deleteTodo");
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
</style>
