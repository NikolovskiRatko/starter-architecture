import { createRouter, createWebHistory, Router } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import * as adminRoutes from "./admin/index";
import { authPaths } from "./auth";
import { i18n } from "@/plugins/i18n";
import { useRootStore } from "@/store/root";

const { t } = i18n.global;

const AdminLayout = () =>
  import(
    /* webpackChunkName: "admin-layout" */
    /* webpackPrefetch: true */
    "@/components/AdminLayout/AdminLayout.vue"
  );

const Error = () =>
  import(
    /* webpackChunkName: "error" */
    /* webpackPrefetch: true */
    "@/pages/Error/ErrorPage.vue"
  );

const NotFound = () =>
  import(
    /* webpackChunkName: "not-found" */
    /* webpackPrefetch: true */
    "@/pages/NotFound/NotFound.vue"
  );

const routes: RouteRecordRaw[] = [
  ...authPaths,
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
      ...Object.values(adminRoutes).flat(),
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
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "errorpage",
    component: Error,
  },
];

const history = createWebHistory();
const router: Router = createRouter({
  history,
  routes,
});

router.afterEach((to) => {
  const { setFrontActiveClass } = useRootStore();

  setTimeout(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    });
  }, 500);

  setFrontActiveClass(to.name);
});

export default (app) => {
  app.router = router;
  app.use(router);
};
