# Scrapped codes in the user store 

## getWriters()
### using new set  
```javascript 
const getWriters = computed(() => {
  const writerCategories = new Set(['writer (staff)', 'artist (staff)']);
  
  return users.value
    .filter(user => writerCategories.has(getUserPositionCategory(user)))
    .sort((a, b) => a.full_name.localeCompare(b.full_name, undefined, { sensitivity: 'base' }));
})

const getWriters = computed(() => {
  return users.value
    .filter((user) => {
      const category = getUserPositionCategory(user)
      return category === 'writer (staff)' || category === 'artist (staff)' || category === 'executive'
    })
    .sort((a, b) => a.full_name.toLowerCase().localeCompare(b.full_name.toLowerCase()))
})

```
