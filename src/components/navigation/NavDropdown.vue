<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { ArrowRight01Icon } from '@hugeicons/core-free-icons/index'
import { ref } from 'vue'

const props = defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  // Consists of label and path
  items: {
    type: Array,
    required: true,
    // Prop validator
    validator: (value) => {
      // checks if both properties exist and are truthy
      return value.every((item) => item.label && item.path) // name = path name
    },
  },
  iconSize: {
    type: Number,
    default: 30,
  },
})

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <div class="dropdown">
    <div class="dropdown__trigger" @click="toggleDropdown">
      <!-- Left Main icon -->
      <HugeiconsIcon class="dropdown__icon" :icon="icon" :size="iconSize" />
      <p class="dropdown__label">{{ label }}</p>
      <!-- Arrow icon  -->
      <HugeiconsIcon
        class="dropdown__arrow"
        :icon="ArrowRight01Icon"
        :class="{ 'dropdown__arrow--open': isOpen }"
        :size="25"
        color="iconColor"
      />
    </div>

    <!-- Transition wrapper  -->
    <transition name="dropdown-fade">
      <!-- Dropdown menu  -->
      <div v-if="isOpen" class="dropdown__menu">
        <RouterLink class="dropdown__item" v-for="item in items" :key="item.path" :to="item.path">
          {{ item.label }}
        </RouterLink>
      </div>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;

.active {
  background: rgba(75, 85, 99, 0.7);
  border-radius: 0 50px 50px 0;
  padding: spacing(3) spacing(5);
  margin-left: calc(-1 * spacing(4));
  padding-left: spacing(4);
  width: calc(100% + spacing(4));
}

.dropdown {
  width: 100%;

  &__trigger {
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: spacing(3);
    align-items: center;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      opacity: 0.8;
    }
  }

  &__label {
    color: $text-light-main;
    flex: 1;
    margin: 0;
  }

  &__icon {
    color: $surface-soft;
  }

  &__arrow {
    margin-left: auto;
    flex-shrink: 0;
    transition: transform 0.3s ease;

    &--open {
      transform: rotate(90deg); // rotate arrow
    }
  }

  &__menu {
    display: flex;
    flex-direction: column;
    margin-left: spacing(10);
    margin-top: spacing(3);
    gap: spacing(2);
    overflow: hidden;
  }

  &__item {
    color: $text-light-main;
    text-decoration: none;
    padding: spacing(2) spacing(3);
    border-radius: 4px;
    transition: all 0.2s ease;
    font-size: $font-size-sm;

    &:hover {
      background: rgba(75, 85, 99, 1);
      padding-left: spacing(4);
    }

    &.router-link-active {
      background: rgba(255, 255, 255, 0.15);
      font-weight: 600;
    }
  }

  // Dropdown transition animations
  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: all 0.3s ease;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .dropdown-fade-enter-to,
  .dropdown-fade-leave-from {
    opacity: 1;
    max-height: 500px;
  }
}
</style>
