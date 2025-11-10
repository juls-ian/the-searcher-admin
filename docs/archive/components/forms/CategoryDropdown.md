# Scrapped component 

```javascript
defineProps({
  categories: { type: Array, required: true },
  modelValue: [String, Number, null],
})

/**
 * update:modelValue → keeps form value in sync (two-way binding)
 * select → notifies parent about selection
 */
const emit = defineEmits(['update:modelValue', 'select'])

const selectCategory = (categoryId) => {
  // emits events
  emit('update:modelValue', categoryId) // update field.value
  emit('select', categoryId) // react to selection
}
```

```html
<template>
  <!-- Top level categories -->
  <ul class="dropdown-list">
    <li v-for="category in categories" :key="category.id" class="dropdown-list__item">
      <span @click="selectCategory(category.id)">
        {{ category.category_name }}
      </span>

      <!-- Recursive render if top level has subcategory -->
      <CategoryDropdown
        v-if="category.children && category.children.length"
        :categories="category.children"
        :model-value="modelValue"
        @update:modelValue="emit('update:modelValue', $event)"
        @select="emit('select', $event)"
      />
    </li>
  </ul>
</template>
```

```scss
<style lang="scss" scoped>
@use '@/assets/utils' as *;

.dropdown-list {
  list-style: none;
  margin: 0;
  padding: 0;

  &__item {
    position: relative;
    padding: 0.4rem 1rem;
    background: $text-light-main;
    border: 1px solid #eee;
    cursor: pointer;

    &:hover {
      background: $primary-accent;
    }

    > ul {
      display: none;
      position: absolute;
      top: 0;
      left: 100%;
      min-width: 18rem;
      z-index: 100;

      &:hover {
        display: block;
      }
    }
  }
}
</style>
```
