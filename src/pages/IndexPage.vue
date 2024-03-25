<template>
  <new-entry />
  <activity-list-vue />
</template>

<script>
import { defineComponent } from "vue";
import NewEntry from "components/NewEntry.vue";
import ActivityListVue from "src/components/ActivityList.vue";

export default defineComponent({
  name: "IndexPage",
  components: { NewEntry, ActivityListVue },
});
</script>

<style scoped>
.main-title {
  font-size: 20px;
  text-align: center;
  line-height: 1em;
}
</style>
