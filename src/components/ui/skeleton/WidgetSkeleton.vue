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
        <SkeletonLoader class="article__thumbnail" width="18rem" height="10rem" border-radius="1rem" />
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
