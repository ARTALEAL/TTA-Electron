<template>
  <div class="activity">
    <h1>Hello</h1>
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
      window.myApp.editDescription(newData);
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
