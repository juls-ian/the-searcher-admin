<script setup>
  defineProps({
    links: Array
  })

  const emit = defineEmits(['page-change'])
  const changePage = (url) => {
    if (!url) return
    emit('page-change', url)
  }
</script>

<template>
  <div class="pagination">
    <button
      class="page-link"
      v-for="link in links"
      :key="index"
      @click="changePage(link.url)"
      :class="{ active: link.active }"
      :disabled="!link.url || link.active"
      v-html="link.label"
    />
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;

  .pagination {
    display: flex;
    gap: spacing(1);
    align-items: center;
    justify-content: center;
    margin: spacing(2) 0;
  }

  .page-link {
    padding: spacing(1) spacing(1.5);
    border: 1px solid $surface-light;
    background: $surface-light;
    cursor: pointer;
    border-radius: 0.4rem;
    transition: all 0.2s;

    &:hover:not(:disabled) {
      background: $primary-accent;
      border-color: black;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }

    &.active {
      background: $primary-base;
      color: $surface-light;
      border-color: $surface-dark;
    }
  }
</style>
