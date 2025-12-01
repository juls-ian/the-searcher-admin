# Scrapped codes in the RecentArticles component 

## displaying thumbnail 
### 1.0: div bg approach 
```html
<div
  :style="{
    background: `url(${article.thumbnail})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '200px',
    height: '200px'
  }"
></div>
```