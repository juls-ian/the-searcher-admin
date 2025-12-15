# Unused codes in the SkeletonLoader component

## initial version 
```vue 
<script setup>
  defineProps({
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '1rem'
    },
    borderRadius: {
      type: String,
      default: '0.25rem'
    },
    circle: {
      type: Boolean,
      default: false
    }
  })
</script>

<template>
  <div
    class="skeleton"
    :class="{ 'skeleton--circle': circle }"
    :style="{
      width: width,
      height: height,
      borderRadius: circle ? '50%' : borderRadius
    }"
  />
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;
  @use 'sass:color';

  .skeleton {
    margin: spacing(0.5) 0;
    background: linear-gradient(
      90deg,
      $primary-muted 0%,
      color.adjust($primary-muted, $lightness: 5 * 1%) 50%,
      $primary-muted 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1s infinite;

    &--circle {
      border-radius: 50%;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }

    100% {
      background-position: -200% 0;
    }
  }
</style>
```