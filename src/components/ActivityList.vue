<template>
  <section class="activity-list">
    <div v-if="!allTasks" class="no-entries">Ещё нет записей</div>
    <activity-vue
      v-else
      v-for="task in allTasks"
      :title="task.title"
      :description="task.description"
      :time="task.time"
      :key="task.id"
    />
  </section>
</template>

<script>
import { defineComponent } from "vue";
import ActivityVue from "./Activity.vue";
import { orderBy } from "lodash";
export default defineComponent({
  name: "ActivityList",
  components: { ActivityVue },
  data() {
    return {
      allTasks: null,
    };
  },
  methods: {},
  created() {
    window.myApp.getEntries(
      (_, data) => (this.allTasks = orderBy(data.entries, "createdAt", "desc"))
    );
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
