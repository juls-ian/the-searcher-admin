# Unused code in WidgetSkeleton

## first version 
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

## improved versions
### 1.0: using props 
```vue
<script setup>
  import { useArticleStore } from '@/stores/article'
  import { MoreHorizontalIcon } from '@hugeicons/core-free-icons/index'
  import { HugeiconsIcon } from '@hugeicons/vue'
  import { onMounted } from 'vue'
  import SkeletonLoader from '@/components/ui/skeleton/SkeletonLoader.vue'

  const articleStore = useArticleStore()
  const surfaceDark = '#181818'

  onMounted(() => {
    // Only fetch if articles aren't already loaded
    if (articleStore.articles.length === 0) {
      articleStore.fetchArticles()
    }
  })
</script>

<template>
  <div class="widget">
    <h4 class="widget__title">Recent Articles</h4>
    <article class="widget__feed article" v-for="n in 5" :key="`skeleton-${n}`">
      <div class="widget__feed-left">
        <SkeletonLoader class="article__title" width="18rem" height="10rem" border-radius="1rem" />
        <SkeletonLoader class="article__title" width="80%" height="1.5rem" />
      </div>

      <div class="widget__feed-right">
        <SkeletonLoader class="article__category" width="6rem" height="1rem" />
        <SkeletonLoader class="article__writer" width="10rem" height="1rem" />
        <SkeletonLoader class="article__publish-date" width="8rem" height="1rem" />
        <div class="options">
          <SkeletonLoader width="2rem" height="1rem"/>
          <!-- <HugeiconsIcon :icon="MoreHorizontalIcon" :size="20" :color="surfaceDark" /> -->
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;
  @use '@/assets/layouts' as *;

  .article {
    gap: spacing(2);
  }
</style>
```

### 1.1: using css custom properties 
```vue 
<template>
  <div class="widget">
    <h4 class="widget__title">Recent Articles</h4>
    <article class="widget__feed article" v-for="n in 5" :key="`skeleton-${n}`">
      <div class="widget__feed-left">
        <SkeletonLoader class="article__image" />
        <SkeletonLoader class="article__title" />
      </div>

      <div class="widget__feed-right">
        <SkeletonLoader class="article__category" />
        <SkeletonLoader class="article__writer" />
        <SkeletonLoader class="article__publish-date" />
        <div class="options">
          <SkeletonLoader class="article__options" />
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;
  @use '@/assets/layouts' as *;

  .article {
    gap: spacing(2);

    &__image {
      width: 18rem;
      height: 10rem;
      border-radius: 1rem;

      @media (max-width: 768px) {
        width: 100%;
        height: 8rem;
      }

      @media (max-width: 480px) {
        height: 6rem;
      }
    }

    &__title {
      width: 80%;
      height: 1.5rem;

      @media (max-width: 768px) {
        width: 100%;
        height: 1.2rem;
      }
    }

    &__category {
      width: 6rem;
      height: 1rem;
    }

    &__writer {
      width: 10rem;
      height: 1rem;
    }

    &__publish-date {
      width: 8rem;
      height: 1rem;
    }

    &__options {
      width: 2rem;
      height: 1rem;
    }
  }
</style>
```