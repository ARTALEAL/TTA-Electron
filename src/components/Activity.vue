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
    <div class="actions">
      <span class="time">{{ convertedTime }}</span>
    </div>
    <q-btn size="xs" dense icon="delete"></q-btn>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Activity",
  props: {
    title: String,
    description: String,
    time: Number,
    id: Number,
  },
  data() {
    return {
      timeIn: this.$props.time,
      newDescription: "",
      editPopup: false,
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
  },
  computed: {
    convertedTime: function () {
      const date = new Date(0);
      date.setSeconds(this.timeIn);
      return date.toISOString().substring(11, 19);
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

.time {
  color: #777;
}
</style>
