<script setup>
  import { useArticleStore } from '@/stores/article'
  import { MoreHorizontalIcon } from '@hugeicons/core-free-icons/index'
  import { HugeiconsIcon } from '@hugeicons/vue'
  import { onMounted } from 'vue'

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
    <article
      class="widget__feed article"
      v-for="article in articleStore.getRecentArticles(5)"
      :key="article.id"
    >
      <div class="widget__feed-left">
        <img
          class="article__thumbnail"
          :src="article.thumbnail"
          :alt="`${article.title} thumbnail`"
          @error="(e) => console.log('Image failed to load:', article.thumbnail)"
        />
        <h6 class="article__title">{{ article.title }}</h6>

      </div>

      <div class="widget__feed-right">
        <span class="article__category">{{ article.category.parent }}</span>
        <span class="article__writer">{{ article.writer }}</span>
        <span class="article__publish-date">{{ article.published_at }}</span>
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
      height: 12rem;
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
      color: $text-alt;
    }

    &__publish-date {
      font-size: $font-size-xs;
    }
  }
</style>
