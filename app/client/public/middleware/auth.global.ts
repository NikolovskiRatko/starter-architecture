/**
 * Global auth middleware for the Nuxt public frontend.
 *
 * Most pages are public by default. Pages opt INTO authentication via:
 *
 *   definePageMeta({ requireAuth: true })
 *   definePageMeta({ requireContext: 'public' })    // implies requireAuth
 *   definePageMeta({ requirePermissions: ['x'] })   // implies requireAuth
 *
 * On the first navigation per render the middleware initialises the auth
 * store by calling /api/auth/me. On SSR the inbound `cookie` header is
 * forwarded so cookie-based sessions are recognised before the page
 * renders.
 */
export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useAuthStore();
  const requireAuth = Boolean(
    to.meta.requireAuth || to.meta.requireContext || (to.meta.requirePermissions as string[] | undefined)?.length
  );

  if (!auth.isInitialised) {
    await auth.fetchMe();
  }

  // Authenticated user hitting /login or /sign-up → bounce to dashboard.
  if (auth.isAuthenticated && (to.path === '/login' || to.path === '/sign-up')) {
    return navigateTo('/dashboard');
  }

  if (!requireAuth) {
    return;
  }

  if (!auth.isAuthenticated) {
    return navigateTo({ path: '/login', query: { redirect: to.fullPath } });
  }

  const requiredContext = to.meta.requireContext as 'admin' | 'public' | undefined;
  if (requiredContext && !auth.hasContext(requiredContext)) {
    return navigateTo('/forbidden');
  }

  const requiredPermissions = (to.meta.requirePermissions as string[] | undefined) ?? [];
  if (requiredPermissions.length > 0 && !requiredPermissions.some((p) => auth.hasPermission(p))) {
    return navigateTo('/forbidden');
  }
});
