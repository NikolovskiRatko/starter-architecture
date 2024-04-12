import { createRouter, createWebHistory, Router } from "vue-router";
import { useRootStore } from "@/store/root";

import { adminPaths } from "./admin";
import { authPaths } from "./auth";

// Pages
const Error = () =>
  import(
    /* webpackChunkName: "error" */
    /* webpackPrefetch: true */
    "@/pages/Error/ErrorPage.vue"
  );

const routes = [
  authPaths,
  adminPaths,
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
