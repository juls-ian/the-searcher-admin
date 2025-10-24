<script setup>
import { onMounted, ref } from 'vue'
import { useArticleCategoryStore } from '@/stores/articleCategory'

/**
 * how it will receive and send data for v-model
 * props & emits
 */

// Props: data from parent -> child (receive and )
const props = defineProps({
  // current value: incoming data from parent (v-model)
  modelValue: {
    type: [Number, String, null],
    default: null,
  },
  // Key for display label
  labelName: {
    type: String,
    default: 'name',
  },
  // Key for unique value or id
  valueKey: {
    type: String,
    default: 'id',
  },
  parentKey: {
    type: String,
    default: 'parent_id', // if hierarchal
  },
  data: {
    type: Array,
    required: true, // array of objects (flat or nested)
  },
  placeholder: {
    type: String,
    default: 'Select option',
  },
  hierarchal: {
    type: Boolean,
    default: false, // if true show nested submenus
  },
})

// Emits: data from child -> parent
const emit = defineEmits(['update:modelValue']) // update:modelValue → keeps form value in sync (two-way binding)

const isDropdownOpen = ref(false)
const selectedItem = ref('') // category name shown
const openSubmenuId = ref(null) // track which submenu is open

// Get children for hierarchal dropdown
const getChildren = (parentId) => {
  return props.data.filter((child) => child[props.parentKey] === parentId)
}

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value
  if (isDropdownOpen.value) {
    openSubmenuId.value = null
  }
}

const toggleSubmenu = (parentId, event) => {
  event.stopPropagation() // prevent closing main dropdown
  openSubmenuId.value = openSubmenuId.value === parentId ? null : parentId // open and closing submenu and updates the ref
}

const selectItem = (item, path) => {
  emit('update:modelValue', item[props.valueKey]) // emits the id so parent can get it
  selectedItem.value = path
  isDropdownOpen.value = false
}

const closeDropdown = () => {
  isDropdownOpen.value = false

  // Reset submenu when closing dd
  if (!isDropdownOpen.value) {
    openSubmenuId.value = null
  }
}
</script>

<template>
  <!-- Click-away-to-close function-->
  <div v-if="isDropdownOpen" class="dropdown-overlay" @click="closeDropdown"></div>
  <!-- Actual dropdown -->
  <div class="dropdown">
    <button type="button" class="dropdown__button" @click="toggleDropdown">
      <span class="dropdown__button-label" :class="{ placeholder: !selectedItem }">
        {{ selectedItem || props.placeholder }}
      </span>
    </button>

    <!-- Parent category -->
    <ul v-if="isDropdownOpen" class="dropdown__menu">
      <!-- For hierarchal dropdown -->
      <template v-if="props.hierarchal">
        <li
          v-for="parent in data.filter((item) => !item[props.parentKey])"
          :key="parent[props.valueKey]"
          class="dropdown__menu-item has-submenu"
          @click="toggleSubmenu(parent[props.valueKey], $event)"
        >
          {{ parent[props.labelName] }}

          <!-- Subcategory -->
          <ul
            v-if="getChildren(parent[props.valueKey]).length"
            class="dropdown__submenu"
            :class="{ 'is-open': openSubmenuId === parent[props.valueKey] }"
          >
            <li
              v-for="child in getChildren(parent[props.valueKey])"
              :key="child[props.valueKey]"
              class="dropdown__submenu-item"
              :value="child[props.valueKey]"
              @click.stop="
                selectItem(
                  child,
                  `${parent[props.labelName]} > ${child[props.labelName]}`, // News > Campus
                )
              "
            >
              {{ child[labelName] }}
            </li>
          </ul>
        </li>
      </template>

      <!-- For flat dropdown -->
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
    // background: $surface-fields;
    background: $surface-fields;
    cursor: pointer;
    width: 100%;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: inherit;
    font-size: inherit;

    &-label {
      color: $text-dark-main;
      font-size: $font-size-sm;
      font-family: $pop;
    }

    &:focus {
      outline: 0.1rem solid $primary-muted;
    }

    &:hover {
      background: $primary-muted;

      span {
        color: $text-light-main;
      }

      &::after {
        color: $text-light-main;
      }
    }

    &::after {
      content: '▼';
      font-size: 10px;
      color: $text-dark-main;
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
    background: $surface-fields !important;
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
      list-style: none;
      color: $text-dark-main;
      font-size: $font-size-sm;
      font-family: $pop;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: $primary-muted;
        color: $text-light-main;

        &.has-submenu::after {
          color: $text-light-main;
        }
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
