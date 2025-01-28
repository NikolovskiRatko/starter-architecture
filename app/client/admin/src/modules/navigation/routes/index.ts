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

const Menu = () =>
  import(
    /* webpackChunkName: "menu" */
    /* webpackPrefetch: true */
    "../pages/MenuPage.vue"
  );

const NavigationPage = () =>
  import(
    /* webpackChunkName: "menus" */
    /* webpackPrefetch: true */
    "../pages/NavigationPage.vue"
  );

const { main, menus, menu, editNavigation, addNavigation } =
  NAVIGATION_ROUTES_DATA;

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
  {
    path: menu.path,
    name: menu.name,
    component: Menu,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
  {
    path: editNavigation.path,
    name: editNavigation.name,
    component: NavigationPage,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
  {
    path: addNavigation.path,
    name: addNavigation.name,
    component: NavigationPage,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
];
