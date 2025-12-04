# Unused code in WidgetSkeleton

```vue 
<script setup>
</script>

<template>
  <div class="widget">
    <h4 class="widget__title">Recent Articles</h4>
    <article
      class="widget__feed article"
      v-for="n in 5"
      :key="`skeleton-${n}`"
    >
      <div class="widget__feed-left">
        <div class="article__thumbnail skeleton" />
        <div class="article__title skeleton" />
      </div>

      <div class="widget__feed-right">
        <div class="article__category skeleton" />
        <div class="article__writer skeleton" />
        <div class="article__publish-date skeleton" />
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;
  @use '@/assets/layouts' as *;

  .skeleton {
    background: linear-gradient(
      90deg,
      $surface-dark 0%,
      lighten($surface-dark, 5%) 50%,
      $surface-dark 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.25rem;
  }

  @keyframes shimmer {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }

  .article {
    gap: spacing(5);

    &__thumbnail {
      width: 15rem;
      height: 12rem;
      flex-shrink: 0;
      border-radius: 1rem;

      @include respond-to-mf(tablet-lg) {
        width: 21rem;
      }
    }

    &__title {
      width: 80%;
      height: 1.5rem;
    }

    &__category {
      width: 60px;
      height: 1rem;
    }

    &__writer {
      width: 100px;
      height: 1rem;
    }

    &__publish-date {
      width: 80px;
      height: 0.875rem;
    }
  }
</style>
```