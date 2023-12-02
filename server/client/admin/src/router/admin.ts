import { RouteConfig } from "vue-router";
import { i18n } from "@/plugins/i18n";
const { t } = i18n.global;

// Layouts
const AdminLayout = () =>
  import(
    /* webpackChunkName: "admin-layout" */
    /* webpackPrefetch: true */
    "@/layouts/Admin/AdminLayout.vue"
  );

// Pages
const Dashboard = () =>
  import(
    /* webpackChunkName: "dashboard" */
    /* webpackPrefetch: true */
    "@/pages/Dashboard/Dashboard.vue"
  );

const Users = () =>
  import(
    /* webpackChunkName: "users" */
    /* webpackPrefetch: true */
    "@/pages/Users/Users.vue"
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

const NotFound = () =>
  import(
    /* webpackChunkName: "not-found" */
    /* webpackPrefetch: true */
    "@/pages/Admin/NotFound.vue"
  );

const Portlets = () =>
  import(
    /* webpackChunkName: "portlets" */
    /* webpackPrefetch: true */
    "@/pages/Components/Portlets.vue"
  );

const Buttons = () =>
  import(
    /* webpackChunkName: "buttons" */
    /* webpackPrefetch: true */
    "@/pages/Components/Buttons.vue"
  );

/*INSERT NEW IMPORTS HERE*/

export let adminPaths: RouteConfig =
  //  ADMIN PANEL
  {
    path: "/admin",
    component: AdminLayout,
    meta: {
      title: t("strings.home", null),
      auth: {
        roles: ["read_users"],
      },
    },
    children: [
      {
        path: "dashboard",
        name: "dashboard",
        component: Dashboard,
        meta: {
          auth: true,
        },
      },
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
        path: "usersadd",
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
        path: "usersedit/:userId/edit",
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
      {
        path: "components/portlets",
        name: "components.portlets",
        component: Portlets,
        meta: {
          title: t("components.portlets.label", null),
          auth: {
            roles: ["read_users"],
            forbiddenRedirect: "/",
          },
        },
      },
      {
        path: "components/buttons",
        name: "components.buttons",
        component: Buttons,
        meta: {
          title: t("components.portlets.label", null),
          auth: {
            roles: ["read_users"],
            forbiddenRedirect: "/",
          },
        },
      },
      {
        path: "/:catchAll(.*)",
        name: "adminnotfound",
        component: NotFound,
        meta: {
          title: t("page.not_found", null),
          auth: {
            roles: ["write_users"],
          },
        },
      },
      /*INSERT NEW CONFIGURATOR OPTIONS HERE*/
    ],
  };
