# Scrapped codes in the article store 

## getArticles()
### 1.0: initial 
```javascript 
  const getArticles  = computed(() => articles.value)
```

### getRecentArticles()
### 1.0: computed version - computed cannot take arg 
```javascript 
  const getRecentArticles = computed(() => (limit = 5) => {
    articles.value.slice(0, limit)
  })
```