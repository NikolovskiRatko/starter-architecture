import type { RouteRecordRaw } from "vue-router";

// Pages
const Dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */
    /* webpackPrefetch: true */
    "@/pages/MainDashboard/MainDashboard.vue"
  );

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: "dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      auth: true,
    },
  },
];
