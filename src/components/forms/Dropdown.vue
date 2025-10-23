<script setup>
import { onMounted, ref } from 'vue'
import { useArticleCategoryStore } from '@/stores/articleCategory'

// Props
const props = defineProps({
  modelValue: {
    type: [Number, String, null],
    default: null,
  },
})

// Emits
const emit = defineEmits(['update:modelValue']) // update:modelValue → keeps form value in sync (two-way binding)

const articleCategoryStore = useArticleCategoryStore()

const isDropdownOpen = ref(false)
const selectedCategoryPath = ref('') // category name shown
const openSubmenuId = ref(null) // track which submenu is open

onMounted(() => {
  articleCategoryStore.fetchArticleCategories()
})

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
}

const toggleSubmenu = (parentId, event) => {
  event.stopPropagation() // prevent closing main dropdown
  openSubmenuId.value = openSubmenuId.value === parentId ? null : parentId // open and closing submenu and updates the ref
}

const selectCategory = (category, path) => {
  emit('update:modelValue', category.id)
  selectedCategoryPath.value = path
  isDropdownOpen.value = false
}

const closeDropdown = () => {
  isDropdownOpen.value = false

  // Reset submenu when closing dd
  // if (!isDropdownOpen.value) {
  //   openSubmenuId.value = null
  // }
}

// Helper to get subcategories for a parent
const getSubcategoriesFor = (parentId) => {
  return articleCategoryStore.getSubcategories.filter((sub) => sub.parent_id === parentId)
}
</script>

<template>
  <div v-if="isDropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>
  <div class="dropdown">
    <button type="button" class="dropdown__button" @click="toggleDropdown">
      <span :class="{ placeholder: !selectedCategoryPath }">
        {{ selectedCategoryPath || 'Select Category' }}
      </span>
    </button>

    <!-- Parent category -->
    <ul v-if="isDropdownOpen" class="dropdown__menu">
      <li
        v-for="parentCategory in articleCategoryStore.getParentCategories"
        :key="parentCategory.id"
        class="dropdown__menu-item has-submenu"
        @click="toggleSubmenu(parentCategory.id, $event)"
      >
        {{ parentCategory.category_name }}

        <!-- Subcategory -->
        <ul class="dropdown__submenu" :class="{ 'is-open': openSubmenuId === parentCategory.id }">
          <li
            v-for="subcategory in getSubcategoriesFor(parentCategory.id)"
            :key="subcategory.id"
            class="dropdown__submenu-item"
            :value="subcategory.id"
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
    <!-- <input type="hidden" :value="props.modelValue" /> -->
    <!-- <input type="hidden" :value="selectedCategory" /> -->
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;
@use '@/assets/layouts' as *;

.dropdown-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: transparent; // Changed from red to transparent
}

.anchor {
  anchor-name: --menu-anchor;
}

.target {
  position: absolute;
  position-anchor: --menu-anchor;
  position-area: start center;
}

.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;

  &__button {
    padding: 12px 20px;
    background: $surface-light;
    border: 1px solid $surface-light;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: inherit;
    font-size: inherit;

    span {
      color: $text-dark-main;
    }

    &:hover {
      background: $primary-base;

      span {
        color: $text-light-main;
      }
    }

    &::after {
      content: '▼';
      font-size: 10px;
      color: #666;
    }

    .placeholder {
      color: #999;
    }
  }

  &__menu {
    position: absolute;
    width: 100%;
    min-width: 200px;
    max-height: 400px;
    top: 100%;
    list-style-type: none;
    left: 0;
    margin: spacing(1) 0 0 0;
    padding: 0;
    background: $surface-light;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    overflow-y: auto;
    // overflow-x: hidden;

    &-item {
      width: 100%; // take full width of parent
      position: relative;
      padding: spacing(3) spacing(4);
      cursor: pointer;
      border-bottom: 1px solid $text-dark-sub;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      gap: 0.5em;
      color: $text-dark-main;
      list-style: none;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f5f5f5;
      }

      &-icon {
        position: relative;
      }

      &.has-submenu::after {
        content: '›';
        font-size: 18px;
        color: $text-dark-main;
        // margin-left: spacing(5);
      }
    }
  }

  &__submenu {
    display: none;
    width: 10%;
    position: absolute;
    list-style-type: none;
    top: 0;
    left: spacing(20);
    margin-top: spacing(6);
    padding: 0;
    background: darken($surface-light, 3%);
    border: 1px solid $surface-light;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 18rem;
    max-height: 40rem;
    overflow-y: auto;
    z-index: 99;

    &.is-open {
      display: block;
    }

    &-item {
      position: relative;
      padding: 12px 20px;
      cursor: pointer;
      border-bottom: 1px solid $text-dark-sub;
      display: block;
      color: $text-dark-main;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #e8f4f8;
      }
    }
  }

  // &__menu-item:hover > &__submenu {
  //   display: block;
  // }
}
</style>
