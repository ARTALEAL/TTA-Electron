<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Time Tracking App </q-toolbar-title>

        <div>v {{ versionApp }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Меню </q-item-label>
        <MenuItems v-for="item in menuItems" :key="item.title" v-bind="item" />

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";
import EssentialLink from "components/EssentialLink.vue";
import { version } from "../../package";
import MenuItems from "components/MenuItems.vue";

const menuItems = [
  {
    title: "Timer",
    caption: "Таймер задач",
    icon: "timer",
    link: "/",
  },
  {
    title: "Todo - list",
    caption: "Список задач",
    icon: "event",
    link: "/todo",
  },
];

const linksList = [
  {
    title: "Калькулятор зарплаты (online)",
    caption: "Калькулятор расчёта зарплаты",
    icon: "attach_money",
    link: "https://artaleal.github.io/salary-calc/",
  },
];

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
    MenuItems,
  },

  data() {
    return {
      linksList,
      menuItems,
      leftDrawerOpen: false,
      versionApp: version,
    };
  },

  methods: {
    toggleLeftDrawer() {
      this.leftDrawerOpen = !this.leftDrawerOpen;
    },
  },
  mounted() {},
});
</script>
