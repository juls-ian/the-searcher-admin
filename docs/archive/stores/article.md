# Scrapped codes in the article store 

## getArticles()
### 1.0: initial 
```javascript 
  const getArticles  = computed(() => articles.value)
```

## getRecentArticles()
### 1.0: computed version - computed cannot take arg 
```javascript 
  const getRecentArticles = computed(() => (limit = 5) => {
    articles.value.slice(0, limit)
  })
```

## fetchArticles()
### 1.0: with limit param
```javascript 
  async function fetchArticles(limit) {
    error.value = null

    try {
      const response = await api.get('/articles')
      articles.value = response.data || [] // assign to state
      paginationLinks.value = response.meta.links || []

      console.log(paginationLinks.value)
    } catch (err) {
      error.value = err.response?.data?.message || 'Cannot retrieve articles'
      throw err
    }
  }
```

## getImageUrl()
### 1.0: initial version 
```javascript
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'images/default-article.jpg'

    // If it's already a full URL (seeded data), use it directly
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath
    }

    // Otherwise, it's a storage path (real uploaded images)
    return `/storage/${imagePath}`
  }
  ```
  ### 1.1: second version 
  ```javascript 
  const getImageUrl = (imagePath) => {
  if (!imagePath) return '/images/default-article.jpg'
  
  // If it's already a full URL (like https://...), use it directly
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath
  }
  
  // If it already has /storage/ prefix, use as-is
  if (imagePath.startsWith('/storage/')) {
    // Check if it's a malformed path like /storage/https://...
    if (imagePath.includes('https://') || imagePath.includes('http://')) {
      // Extract the actual URL from the malformed path
      const urlMatch = imagePath.match(/(https?:\/\/.+)/)
      return urlMatch ? urlMatch[1] : '/images/default-article.jpg'
    }
    return imagePath
  }
  
  // Otherwise, add the storage prefix
  return `/storage/${imagePath}`
}
```

## addArticle()
### 1.0: initial 
```javascript 
async function addArticle(formData) {
  error.value = null

  try {
    const userStore = useUserStore()
    const user = userStore.fetchCurrentUser
    formData.publisher_id = user.id

    const response = await api.post('/articles', formData)
    articles.value.unshift(formData)
    return response.data
  } catch (err) {
    error.value = err.response?.data?.message || 'Cannot publish article'
    console.error(err)
    throw err
  }
}
```