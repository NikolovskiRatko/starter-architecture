import { createRouter, createWebHistory } from 'vue-router';
import type { RouteLocationNormalized, RouteRecordRaw, Router } from 'vue-router';
import * as adminRoutes from './admin/index';
import { authPaths } from './auth';
import { i18n } from '@/plugins/i18n';
import { useRootStore } from '@/store/root';
import { useAuthStore } from '@/stores/auth';

const { t } = i18n.global;

const AdminLayout = () =>
  import(
    /* webpackChunkName: "admin-layout" */
    /* webpackPrefetch: true */
    '@/components/AdminLayout/AdminLayout.vue'
  );

const Error = () =>
  import(
    /* webpackChunkName: "error" */
    /* webpackPrefetch: true */
    '@/pages/Error/ErrorPage.vue'
  );

const NotFound = () =>
  import(
    /* webpackChunkName: "not-found" */
    /* webpackPrefetch: true */
    '@/pages/NotFound/NotFound.vue'
  );

const routes: RouteRecordRaw[] = [
  ...authPaths,
  {
    path: '/admin',
    component: AdminLayout,
    meta: {
      title: t('strings.home', null),
      auth: {
        roles: ['read_users'],
      },
    },
    children: [
      ...Object.values(adminRoutes).flat(),
      {
        path: '/:catchAll(.*)',
        name: 'adminnotfound',
        component: NotFound,
        meta: {
          title: t('page.not_found', null),
          auth: true,
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    name: 'errorpage',
    component: Error,
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

const AUTH_ROUTE_NAMES = new Set(['login', 'sign-up', 'home']);

/**
 * Explicit auth guard — replaces the implicit guard installed by the
 * removed @websanova/vue-auth library. Honours the legacy meta shape so
 * route definitions don't need to be migrated:
 *
 *   meta: {}                                  → public route
 *   meta: { auth: false }                     → public route (explicit)
 *   meta: { auth: true }                      → any authenticated user
 *   meta: { auth: { roles: ['perm.x', …] } }  → user must hold at least one
 *                                                of the listed permissions
 *
 * On first navigation, the guard initialises the store via /auth/user so
 * the cookie (or bearer token) is materialised into client state before
 * any gated route renders.
 */
router.beforeEach(async (to: RouteLocationNormalized) => {
  const store = useAuthStore();
  const authMeta = to.meta.auth as boolean | { roles?: string[] } | undefined;

  if (!store.isInitialised) {
    await store.fetchMe();
  }

  // Already-authenticated user hitting login/sign-up → bounce to dashboard.
  if (store.isAuthenticated && AUTH_ROUTE_NAMES.has(String(to.name ?? ''))) {
    return { name: 'dashboard' };
  }

  if (authMeta === undefined || authMeta === false) {
    return true;
  }

  if (!store.isAuthenticated) {
    return {
      name: 'login',
      query: to.fullPath && to.fullPath !== '/' ? { redirect: to.fullPath } : undefined,
    };
  }

  if (authMeta === true) {
    return true;
  }

  if (typeof authMeta === 'object' && Array.isArray(authMeta.roles)) {
    const allowed = authMeta.roles.some((p) => store.permissionsArray.includes(p));
    if (!allowed) {
      return { name: 'login' };
    }
  }

  return true;
});

router.afterEach((to) => {
  const { setFrontActiveClass } = useRootStore();

  setTimeout(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, 500);

  setFrontActiveClass(to.name);
});

export default router;
