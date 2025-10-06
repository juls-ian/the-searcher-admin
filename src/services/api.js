import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // easily switch between dev, staging, and production without changing code
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})

/**
 * Request interceptor : for adding auth tokens (Runs before sending any request)
 * injects the saved auth_token into every outgoing request’s Authorization header.
 */
api.interceptors.request.use(
  // First function
  (config) => {
    const token = localStorage.getItem('auth_token') // retrieves a token from localStorage (stored for session use)

    // If token exists add to Authorization header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  // Second function
  (error) => Promise.reject(error), // rejects the request so you can catch the error later
)

/**
 * Response interceptor 1: to unwrap data
 */
api.interceptors.response.use(
  // Use a property that makes sense, like 'payload' or 'result'
  (response) => ({
    payload: response.data.data,
    success: response.data.success,
    message: response.data.message,
  }),
  (error) => Promise.reject(error),
)

/**
 * Response interceptor 2: for handling error globally (kicks in after Axios gets a response back from API)
 *
 */
api.interceptors.response.use(
  // First function
  (response) => response, // if request succeeds, return the response unchanged
  // Second function
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login, etc.
      localStorage.removeItem('auth_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
