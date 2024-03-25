<template>
  <section class="activity-list">
    <activity-vue />
  </section>
</template>

<script>
import { defineComponent } from "vue";
import ActivityVue from "./Activity.vue";
export default defineComponent({
  name: "ActivityList",
  components: { ActivityVue },
  data() {
    return {};
  },
  methods: {},
});
</script>

<style scoped>
.activity-list {
  display: flex;
  flex-direction: column;
}
</style>
