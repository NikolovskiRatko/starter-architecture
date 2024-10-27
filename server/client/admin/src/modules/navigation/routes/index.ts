import type { RouteRecordRaw } from "vue-router";
import { NAVIGATION_ROUTES_DATA } from "../constants";
import { USER_PERMISSIONS } from "@/modules/users/constants";

const Navigations = () =>
  import(
    /* webpackChunkName: "navigations" */
    /* webpackPrefetch: true */
    "../pages/NavigationsPage.vue"
  );

const Menus = () =>
  import(
    /* webpackChunkName: "menus" */
    /* webpackPrefetch: true */
    "../pages/MenusPage.vue"
  );

const { main, menus } = NAVIGATION_ROUTES_DATA;

export const navigationRoutes: RouteRecordRaw[] = [
  {
    path: main.path,
    name: main.name,
    component: Navigations,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
  {
    path: menus.path,
    name: menus.name,
    component: Menus,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
];
