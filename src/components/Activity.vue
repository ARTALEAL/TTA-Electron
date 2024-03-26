<template>
  <div class="activity">
    <div class="details">
      <h5 class="title">{{ title }}</h5>
      <p class="description">{{ description }}</p>
    </div>
    <div class="actions">
      <span class="time">{{ convertedTime }}</span>
    </div>
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
  },
  data() {
    return {
      timeIn: this.$props.time,
    };
  },
  methods: {},
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

.time {
  color: #777;
}
</style>
