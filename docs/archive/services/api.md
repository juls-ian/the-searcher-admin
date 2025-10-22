# Unused codes from api.js

## api connector
### 1.0: cookie/session auth (Laravel Sanctum in SPA mode)
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api', // easily switch between dev, staging, and production without changing code
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
})
```

## response data interceptor 
### 1.0: standard = response.data.user
```javascript 
api.interceptors.response.use(
  (response) => response, // just return the original Axios response
  (error) => Promise.reject(error),
)
```
### 1.1: simplified api call = response.user
```javascript
api.interceptors.response.use(
  (response) => response.data.data || response.data,
  (error) => Promise.reject(error),
)

```
### 1.2: best of both worlds -> data.response.user and data.user
```javascript 
api.interceptors.response.use(
  (response) => ({
    ...response,
    data: response.data.data || response.data,
  }),
  (error) => Promise.reject(error)
)
```
### 1.3: chained 
```javascript 
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
  ```
