# Unused codes in auth store

## login()
### 1.0: with cookie call
```javascript
async function login(credentials) {
  loading.value = true
  error.value = null

  try {
    // For Laravel Sanctum: getting CSRF cookie first

    await api.get('/sanctum/csrf-cookie')

    // Login request
    const response = await api.post('/login', credentials)

    // Store token and user data
    token.value = response.data.token
    user.value = response.data.user

    localStorage.setItem('auth_token', token.value)
    return { success: true }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login Failed'
    throw err
  } finally {
    loading.value = false
  }
}
```
### 1.1: using standard api call 
```javascript
async function login(credentials) {
  loading.value = true
  error.value = null

  try {
    // Login request - must match Laravel login route
    const response = await api.post('/auth/login', {
      emailOrId: credentials.emailOrId,
      password: credentials.password,
    })

    // Nested data structure returned by Laravel
    token.value = response.data.token
    user.value = response.data.user

    localStorage.setItem('auth_token', token.value)
    return { success: true }
  } catch (err) {
    error.value = err.response?.data?.message || 'Login Failed'
    throw err
  } finally {
    loading.value = false
  }
}
```
### 1.2: using unwrapped api call 
```javascript
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      // Login request - must match Laravel login route
      const response = await api.post('/auth/login', {
        emailOrId: credentials.emailOrId,
        password: credentials.password,
      })

      console.log('Full response:', response)
      console.log('Token:', response.token)
      console.log('User:', response.user)

      // Since interceptor unwraps, response is already the data object
      token.value = response.token // simplified thanks to interceptor in api.js
      user.value = response.user

      localStorage.setItem('auth_token', token.value)
      return { success: true }
    } catch (err) {
      error.value = err.response?.data?.message || 'Login Failed'
      throw err
    } finally {
      loading.value = false
    }
  }
```

## fetchUser()
### 1.0: standard api call = response.data.user
```javascript
async function fetchUser() {
  if (!token.value) return // if token value is falsy

  try {
    const response = await api.get('/auth/current-user') // must match the api route
    user.value = response.data
  } catch (err) {
    console.error('Failed to fetch user', err)
    // If fetch fails, user is probably not authenticated
    logout()
  }
}
```
### 1.1: simplified api call = response.user
```javascript 
  async function fetchUser() {
    if (!token.value) return // if token value is falsy

    try {
      const response = await api.get('/auth/current-user') // must match the api route
      user.value = response.user // changed from response.data due to interceptor
    } catch (err) {
      console.error('Failed to fetch user', err)
      // If fetch fails, user is probably not authenticated
      logout()
    }
  }
  ```
