import type { RouteRecordRaw } from "vue-router";
import { USER_PERMISSIONS } from "../constants";
import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

const Users = () =>
  import(
    /* webpackChunkName: "users" */
    /* webpackPrefetch: true */
    "../pages/UsersList.vue"
  );

const UserForm = () =>
  import(
    /* webpackChunkName: "user-form" */
    /* webpackPrefetch: true */
    "../pages/UserForm.vue"
  );

// Admin Components
const MyProfile = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "../pages/MyProfile.vue"
  );

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: "users",
    name: "users",
    component: Users,
    meta: {
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
  {
    path: "user/add",
    name: "add.user",
    component: UserForm,
    meta: {
      title: t("users.add", null),
      auth: {
        roles: [USER_PERMISSIONS.writeUsers],
      },
    },
  },
  {
    path: "user/:userId",
    name: "edit.user",
    component: UserForm,
    meta: {
      title: t("users.edit_user", null),
      auth: {
        roles: [USER_PERMISSIONS.writeUsers],
      },
    },
  },
  {
    path: "myprofile",
    name: "myprofile",
    component: MyProfile,
    meta: {
      title: t("strings.myprofile", null),
      auth: {
        roles: [USER_PERMISSIONS.readUsers],
      },
    },
  },
];
