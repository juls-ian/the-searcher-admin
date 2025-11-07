import HomeDashboard from '@/views/admin/HomeDashboard.vue'
import StaffLogin from '@/views/auth/StaffLogin.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeDashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: StaffLogin,
      meta: { requiresGuest: true },
    },
    {
      path: '/publisher/publish',
      name: 'publisher-publish',
      component: () => import('../views/admin/publisher/PublisherPublish.vue'),
    },
    {
      path: '/publisher/published',
      name: 'publisher-published',
      component: () => import('../views/admin/publisher/PublisherPublished.vue'),
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/admin/StaffCalendar.vue'),
    },
    {
      path: '/newsletter',
      name: 'newsletter',
      component: () => import('../views/admin/Newsletter.vue'),
    },
    {
      path: '/:notFound(.*)*',
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/AboutView.vue'),
    },
  ],
})

// Global route guard
router.beforeEach(async (to, from, next) => {
  const { useAuthStore } = await import('@/stores/auth')
  const auth = useAuthStore()

  // Initialize auth state & user if token exists
  if (auth.token && !auth.user) await auth.fetchUser()

  // If route requires authentication and user is not authenticated
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return next({ name: 'login' })
  }

  // If route requires guest (login page) and user is already authenticated
  if (to.meta.requiresGuest && auth.isAuthenticated) {
    return next({ name: 'home' })
  }

  next() // allow navigation
})

export default router
