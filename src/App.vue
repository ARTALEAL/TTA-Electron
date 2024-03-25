<template>
  <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  created() {
    window.myApp.getEntries((_, data) => console.log(data.entries));
  },
});
</script>
