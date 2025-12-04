<script setup>
  import { useArticleStore } from '@/stores/article'
  import { MoreHorizontalIcon } from '@hugeicons/core-free-icons/index'
  import { HugeiconsIcon } from '@hugeicons/vue'
  import { onMounted } from 'vue'
  import SkeletonLoader from './SkeletonLoader.vue'

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
        <SkeletonLoader class="article__title" width="15rem" height="12rem" border-radius="1rem" />
        <SkeletonLoader class="article__title" width="80%" height="1.5rem"/>
      </div>

      <div class="widget__feed-right">
        <SkeletonLoader class="article__category" width="60px" height="1rem" />
        <SkeletonLoader class="article__writer" width="100px" height="1rem" />
        <SkeletonLoader class="article__publish-date" width="80px" height="1rem" />
        <div class="options">
          <HugeiconsIcon :icon="MoreHorizontalIcon" :size="20" :color="surfaceDark" />
        </div>
      </div>
    </article>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;
  @use '@/assets/layouts' as *;

  .article {
    gap: spacing(5);

    &__thumbnail {
      width: 15rem;
      height: auto;
      object-fit: cover;
      flex-shrink: 0;
      border-radius: 1rem;

      @include respond-to-mf(tablet-lg) {
        width: 21rem;
      }
    }

    &__category {
    }

    &__writer {
    }

    &__publish-date {
    }
  }
</style>
