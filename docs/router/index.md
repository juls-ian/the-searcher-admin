# Unused codes in router

## route guard
### 1.0: extra variables
```javascript 
// Global navigation guard
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Initialize auth state if not already done
  if (authStore.token && !authStore.user) {
    await authStore.fetchUser()
  }

  const isAuthenticated = authStore.isAuthenticated
  const requiresAuth = to.meta.requiresAuth
  const requiresGuest = to.meta.requiresGuest

  // If route requires authentication and user is not authenticated
  if (requiresAuth && !isAuthenticated) {
    return next({ name: 'login' })
  }

  // If route requires guest (login page) and user is already authenticated
  if (requiresGuest && isAuthenticated) {
    return next({ name: 'home' })
  }

  // Allow navigation
  next()
})
```