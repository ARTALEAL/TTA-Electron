const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },

  {
    path: "/todos",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/Todos.vue") }],
  },

  {
    path: "/salary-calc",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/SalaryCalc.vue") }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
