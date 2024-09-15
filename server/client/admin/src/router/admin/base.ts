import type { RouteRecordRaw } from "vue-router";

// Pages
const MainDashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */
    /* webpackPrefetch: true */
    "@/pages/MainDashboard/MainDashboard.vue"
  );

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "dashboard",
    component: MainDashboard,
    meta: {
      auth: true,
    },
  },
];
