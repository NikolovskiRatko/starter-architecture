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

const MyProfile = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "../pages/MyProfile.vue"
  );

const MyProfilePersonalInformation = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "../pages/MyProfilePersonalInformation.vue"
  );

const MyProfileChangePassword = () =>
  import(
    /* webpackChunkName: "my-profile" */
    /* webpackPrefetch: true */
    "../pages/MyProfileChangePassword.vue"
  );

const {
  add,
  main,
  edit,
  myProfile,
  myProfilePersonalInfo,
  myProfileChangePassword,
} = USER_ROUTES_DATA;

export const usersRoutes: RouteRecordRaw[] = [
  {
    path: main.path,
    name: main.name,
    component: Users,
    meta: {
      auth: {
        roles: main.authRoles,
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
        roles: add.authRoles,
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
        roles: edit.authRoles,
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
        roles: myProfile.authRoles,
      },
    },
    children: [
      {
        path: myProfilePersonalInfo.path,
        name: myProfilePersonalInfo.name,
        component: MyProfilePersonalInformation,
        meta: {
          title: t(myProfilePersonalInfo.translationKey),
          auth: {
            roles: myProfilePersonalInfo.authRoles,
          },
        },
      },
      {
        path: myProfileChangePassword.path,
        name: myProfileChangePassword.name,
        component: MyProfileChangePassword,
        meta: {
          title: t(myProfileChangePassword.translationKey),
          auth: {
            roles: myProfileChangePassword.authRoles,
          },
        },
      },
    ],
  },
];
