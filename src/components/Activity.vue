<template>
  <div class="activity">
    <div class="details">
      <h5 class="title">Title</h5>
      <p class="description">Description</p>
    </div>
    <div class="actions">
      <span class="time">00:00:00</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  name: "Activity",
  data() {
    return {};
  },
  methods: {},
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

.time {
  color: #777;
}
</style>
