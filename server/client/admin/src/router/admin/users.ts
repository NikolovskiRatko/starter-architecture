import type { RouteRecordRaw } from "vue-router";
import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

const Users = () =>
  import(
    /* webpackChunkName: "users" */
    /* webpackPrefetch: true */
    "@/pages/Users/UsersList.vue"
  );

const UserForm = () =>
  import(
    /* webpackChunkName: "user-form" */
    /* webpackPrefetch: true */
    "@/pages/Users/UserForm.vue"
  );

// Admin Components
const MyProfile = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "@/pages/Admin/MyProfile.vue"
  );

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: "users",
    name: "users",
    component: Users,
    meta: {
      auth: {
        roles: ["read_users"],
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
        roles: ["write_users"],
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
        roles: ["write_users"],
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
        roles: ["read_users"],
      },
    },
  },
];
