import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import api from '@/services/api'

export const useAuthStore = defineStore('auth', () => {
  // States
  const user = ref(null)
  const token = ref(localStorage.getItem('auth_token'))
  const loading = ref(false)
  const error = ref(null)

  // GETTERS
  const isAuthenticated = computed(() => !!token.value && !!user.value) // convert value to boolean
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.full_name}` // full_name column in api
  })
  const userRole = computed(() => user.value?.role || '') // safe navigation operator
  const penName = computed(() => user.value?.pen_name || '')

  // ACTIONS
  async function login(credentials) {
    error.value = null

    try {
      // Login request - must match Laravel login route
      const response = await api.post('/auth/login', {
        emailOrId: credentials.emailOrId,
        password: credentials.password,
      })

      console.log('Full response:', response)
      console.log('Token:', response.payload.token)
      console.log('User:', response.payload.user)

      // Since interceptor unwraps, response is already the data object
      token.value = response.payload.token // payload = interceptor in api.js
      user.value = response.payload.user
      localStorage.setItem('auth_token', token.value)

      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login Failed'
      throw err
    }
  }

  async function logout() {
    loading.value = true

    try {
      // Call Laravel logout endpoint
      await api.post('/auth/logout') // must match the api route
    } catch (err) {
      console.error('Logout request failed', err)
    } finally {
      // Clear state
      ;((user.value = null),
        (token.value = null),
        (error.value = null),
        localStorage.removeItem('auth_token'))
      loading.value = false
    }
  }

  async function fetchUser() {
    if (!token.value) return // if token value is falsy

    try {
      const response = await api.get('/auth/current-user') // must match the api route
      user.value = response.payload.user // changed from response.data due to interceptor
    } catch (err) {
      console.error('Failed to fetch user', err)
      // If fetch fails, user is probably not authenticated
      logout()
    }
  }

  // Initialize auth state on app load
  async function initialize() {
    if (token.value) {
      await fetchUser()
    }
  }

  return {
    // State
    user,
    token,
    loading,
    error,

    // Getters
    isAuthenticated,
    fullName,
    userRole,
    penName,

    // Actions
    login,
    logout,
    fetchUser,
    initialize,
  }
})
