import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/page/HomeView.vue'
// import { useAuthStore } from '@/stores/auth.js'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  }
];
//
// const router = createRouter({
//   linkActiveClass: 'router-link-active',
//   history: createWebHistory("/"),
//   routes: [
//     {
//       path: '/',
//       name: 'home',
//       component: HomeView,
//     }
//   ],
// })

// router.beforeEach(async (to, from, next) => {
// 	// ✅ This will work make sure the correct store is used for the current running app
// 	const auth = useAuthStore()
// 	// ✅ Login with remember me token and/or check is user authenticated
// 	await auth.isAuthenticated()
// 	// ✅ Redirect to panel if logged
// 	if (to.name == 'login' && auth.isLoggedIn.value) {
// 		next({ name: 'panel' })
// 	} else if (to.meta.requiresAuth && !auth.isLoggedIn.value) {
// 		// ✅ Redirect to login if not logged
// 		next({ name: 'login', query: { redirected_from: to.fullPath } })
// 	} else {
// 		// ✅ Continue
// 		next()
// 	}
// })

export default function () {
  const history = createWebHistory();
  const router = createRouter({
    history,
    routes
  });

  return router;
}