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
