<script setup>
import { computed } from 'vue'

/**
 * how it will receive and send data for v-model
 * props & emits
 *
 */

// Props: data from parent -> child
const props = defineProps({
  // current value: incoming data from parent (v-model)
  modelValue: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    required: true,
  },
})

// Emits: data from child -> parent
const emit = defineEmits(['update:modelValue'])

const isChecked = computed({
  get: () => props.modelValue, // reading value passed from parent
  set: (value) => emit('update:modelValue', value), // emitting event to update the parent
})
</script>

<template>
  <div class="wrapper">
    <input type="checkbox" class="wrapper__input" v-model="isChecked" />
    <p>{{ props.label }}</p>
  </div>
</template>

<style lang="scss" scope>
@use '@/assets/utils' as *;

/* Wrapper */
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: spacing(1);

  /* Focus handling */
  &:focus:not(.focus-visible) {
    outline: 0;
  }

  /* Toggle base */
  &__input {
    appearance: none;
    background: $surface-fields;
    border: none;
    border-radius: 72px;
    flex-shrink: 0;
    width: 3rem;
    height: 2rem;
    margin: 0;
    position: relative;
    cursor: pointer;
    transition: all 100ms ease-out;

    /* Hover state */
    &:hover {
      background-color: $primary-accent;
      transition-duration: 0s;
    }

    /* Checked state */
    &:checked {
      background: $primary-muted;
      // background: #6e79d6;
    }

    /* Slider knob */
    &::after {
      content: '';
      position: absolute;
      top: 3px;
      left: 3px;
      width: 14px;
      height: 14px;
      background: $surface-light;
      border-radius: 50%;
      transition: all 100ms ease-out;
    }

    /* Checked knob position */
    &:checked::after {
      left: 13px;
    }

    /* Hover while checked */
    &:checked:hover {
      background-color: $primary-muted;
      // background-color: #535db3;
    }

    /* Optional: expand clickable area */
    &::before {
      content: '';
      position: absolute;
      top: -6px;
      right: -6px;
      bottom: -6px;
      left: -6px;
    }
  }

  p {
    color: $text-dark-main;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: $font-size-sm;
    gap: spacing(1);
    cursor: pointer;
    user-select: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
  }
}
</style>
