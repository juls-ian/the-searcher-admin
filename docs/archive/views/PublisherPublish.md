# Scrapped codes in the PublisherPublish

## toggleSubmenu
### 1.0: if-else version
```javascript 
const toggleSubmenu = (parentId, event) => {
  event.stopPropagation() // prevent closing main dropdown
  if (openSubmenuId.value === parentId) {
    openSubmenuId.value = null  // Close it
  } else {
    openSubmenuId.value = parentId  // Open it (and close any other open submenu)
  }
}
```

## categories 
### 1.0: dynamic 
```html
<option value="" disabled selected>Select Category</option>
<optgroup
  v-for="parentCategory in articleCategetParentCategories"
  :key="parentCategory.id"
  :label="parentCategory.category_name"
>
  <option
    v-for="subcategory in articleCategetSubcategories"
    :key="subcategory.id"
    :value="subcategory.id"
  >
    {{ subcategory.category_name }}
  </option>
</optgroup>
```
### 1.1: disabled parent as header, subcategories only selectable
```html
<Field name="category">
  <select class="form__input">
    <option value="" disabled selected>Select Category</option>
    
    <option value="1" disabled>📁 News</option>
    <option value="2">&nbsp;&nbsp;Breaking News</option>
    <option value="3">&nbsp;&nbsp;Local News</option>
    
    <option value="4" disabled>📁 Feature</option>
    <option value="5">&nbsp;&nbsp;Profile</option>
    <option value="6">&nbsp;&nbsp;Human Interest</option>
  </select>
</Field>
```
### 1.2: parent categories are selectable
```html 
<Field name="category">
  <select class="form__input">
    <option value="" disabled selected>Select Category</option>
    
    <option value="1">News</option>
    <option value="2">&nbsp;&nbsp;→ Breaking News</option>
    <option value="3">&nbsp;&nbsp;→ Local News</option>
    
    <option value="4">Feature</option>
    <option value="5">&nbsp;&nbsp;→ Profile</option>
    <option value="6">&nbsp;&nbsp;→ Human Interest</option>
    
    <option value="7">Literary</option>
    <option value="8">&nbsp;&nbsp;→ Poetry</option>
    <option value="9">&nbsp;&nbsp;→ Short Story</option>
  </select>
</Field>
```
### 1.3: static 
```html 
    <optgroup label="News"> <!-- Parent ID: 1, not selectable -->
      <option value="11">Breaking News</option>
      <option value="12">Local News</option>
      <option value="13">World News</option>
    </optgroup>
```
### 1.4 initial
```javascript
<ul v-if="isDropdownOpen" class="dropdown__menu">
  <li
    v-for="parentCategory in articleCategoryStore.getParentCategories"
    :key="parentCategory.id"
    class="dropdown__menu-item has-submenu"
    @click="toggleSubmenu(parentCategory.id, $event)"
  >
    {{ parentCategory.category_name }}

    <!-- Subcategory -->
    <ul
      class="dropdown__submenu"
      :class="{ 'is-open': openSubmenuId === parentCategory.id }"
    >
      <li
        v-for="subcategory in getSubcategoriesFor(parentCategory.id)"
        :key="subcategory.id"
        class="dropdown__submenu-item"
        @click.stop="
          selectCategory(
            subcategory,
            `${parentCategory.category_name} > ${subcategory.category_name}`,
          )
        "
      >
        {{ subcategory.category_name }}
      </li>
    </ul>
  </li>
</ul>

```

## onMounted()
### 1.0: logs 
```javascript 
onMounted(() => {
  articleStore.fetchArticles()
  articleCategoryStore.fetchArticleCategories()
  userStore.fetchUsers()

  console.log('All staffs count:', userStore.staffs.length)

  // Check the first few staff members
  console.log('First 3 staffs:', userStore.staffs.slice(0, 3))

  // Check what status values exist
  const statuses = [...new Set(userStore.staffs.map((s) => s.status))]
  console.log('All unique status values:', statuses)

  // Check if ANY have 'active' status
  const activeCount = userStore.staffs.filter((s) => s.status === 'active').length
  console.log('Count with status="active":', activeCount)

  console.log('getActiveStaff result:', userStore.getActiveStaff)
})
```

## flat dropdown 
### 1.0: pre checkbox 
```php 
<template v-else>
  <li
    v-for="item in props.data"
    :key="item[props.valueKey]"
    class="dropdown__menu-item"
    @click="selectItem(item, item[props.labelName])"
  >
    {{ item[props.labelName] }}
  </li>
</template>
```

## add to ticker checkbox 
### 1.0: initial 
```vue 
<Field
  name="add-to-ticker"
  v-model="addToTicker"
  type="checkbox"
  :value="true"
  :unchecked-value="false"
  class="form__checkbox"
>
   <label class="form__label">
   <input type="checkbox" :value="true" class="form__checkbox" />
  <Checkbox v-model="addToTicker" class="form__checkbox" label="Add to ticker" />
   </label>
</Field>
```
### 1.1: using veevalidate event handlers 
```vue 
<div class="publisher__field-group form__field-group">
  <Field
    name="add-to-ticker"
    v-slot="{ value, handleChange }"
    type="checkbox"
    :value="true"
    :unchecked-value="false"
  >
    <label class="form__label">
      <!-- <input type="checkbox" :value="true" class="form__checkbox" /> -->
      <Checkbox
        :model-value="value"
        @update:model-value="handleChange"
        class="form__checkbox"
      />
      Add to ticker
    </label>
  </Field>
</div>
```


## getSubcategoriesFor()
### 1.0: helper to get subcategories for parent
```javascript
// Helper to get subcategories for a parent
const getSubcategoriesFor = (parentId) => {
  return articleCategoryStore.getSubcategories.filter((sub) => sub.parent_id === parentId)
}
```

