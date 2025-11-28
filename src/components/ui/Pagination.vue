<script setup>
  defineProps({
    links: Array
  })

  const emit = defineEmits(['page-change'])
  const changePage = (url) => {
    if (!url) return
    emit('page-change', url)
  }

  const cleanLabel = (label) => {
    return label.replace(/&laquo;|&raquo;|»|«/g, '').trim()
  }
</script>

<template>
  <div class="pagination">
    <button
      class="page-link"
      v-for="(link, index) in links"
      :key="index"
      @click="changePage(link.url)"
      :class="{ active: link.active }"
      :disabled="!link.url || link.active"
    >
    {{ cleanLabel(link.label) }}
  </button>
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
    padding: spacing(1.5) spacing(1.5);
    border: 1px solid $surface-light;
    background: $primary-base;
    cursor: pointer;
    border-radius: 0.4rem;
    transition: all 0.2s;
    font-size: $font-size-sm;

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
