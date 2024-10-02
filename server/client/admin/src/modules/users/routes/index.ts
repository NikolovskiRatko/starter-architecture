import type { RouteRecordRaw } from "vue-router";
import { USER_PERMISSIONS, USER_ROUTES_DATA } from "../constants";
import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

const Users = () =>
  import(
    /* webpackChunkName: "users" */
    /* webpackPrefetch: true */
    "../pages/UsersList.vue"
  );

const UserPage = () =>
  import(
    /* webpackChunkName: "user-page" */
    /* webpackPrefetch: true */
    "../pages/UserPage.vue"
  );

// Admin Components
const MyProfile = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "../pages/MyProfile.vue"
  );

const { add, main, edit, myProfile } = USER_ROUTES_DATA;

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: main.path,
    name: main.name,
    component: Users,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
  {
    path: add.path,
    name: add.name,
    component: UserPage,
    meta: {
      title: t(add.translationKey, null),
      auth: {
        roles: [USER_PERMISSIONS.writeUsers],
      },
    },
  },
  {
    path: edit.path,
    name: edit.name,
    component: UserPage,
    meta: {
      title: t(edit.translationKey, null),
      auth: {
        roles: [USER_PERMISSIONS.writeUsers],
      },
    },
  },
  {
    path: myProfile.path,
    name: myProfile.name,
    component: MyProfile,
    meta: {
      title: t(myProfile.translationKey, null),
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
];
