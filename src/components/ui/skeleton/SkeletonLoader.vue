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

  .skeleton {
    background: linear-gradient(
      90deg,
      $surface-dark 0%,
      lighten($surface-dark, 5%) 50%,
      $surface-dark 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;

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
