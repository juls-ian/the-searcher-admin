<script setup>
  import {
    Delete02Icon,
    MoreHorizontalIcon,
    PencilEdit02Icon
  } from '@hugeicons/core-free-icons/index'
  import { HugeiconsIcon } from '@hugeicons/vue'
  import { onClickOutside } from '@vueuse/core'
  import { onMounted, onUnmounted, ref } from 'vue'

  const surfaceDark = '#181818'
  const isOpen = ref(false)
  const menuRef = ref(null)

  const emit = defineEmits(['edit', 'delete'])

  const handleEdit = () => {
    emit('edit')
    isOpen.value = false
  }

  const handleDelete = () => {
    emit('delete')
    isOpen.value = false
  }

  onClickOutside(menuRef, () => {
    if (isOpen.value) {
      isOpen.value = false
    }
  })
</script>

<template>
  <div class="options-menu" ref="menuRef">
    <button class="options-menu__trigger" @click="isOpen = !isOpen">
      <HugeiconsIcon :icon="MoreHorizontalIcon" :size="20" :color="surfaceDark" />
    </button>

    <div class="options-menu__dropdown" v-if="isOpen">
      <button class="options-menu__btn" @click="handleEdit">
        <HugeiconsIcon :icon="PencilEdit02Icon" :size="15" :color="surfaceDark" /> Edit
      </button>
      <button class="options-menu__btn" @click="handleDelete">
        <HugeiconsIcon :icon="Delete02Icon" :size="15" :color="surfaceDark" /> Delete
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  @use '@/assets/utils' as *;

  .options-menu {
      position: relative;


    &__dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      z-index: 99;
      @include box-shadow-bg;
      padding: spacing(2) spacing(3);

      @include respond-to-df(desktop-md) {
        padding: spacing(1) spacing(1.5);
      }


    }

    &__trigger {
    }

    &__btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: spacing(1);

      ga

      &:nth-child(1) {
        margin-bottom: spacing(1.5);
      }
    }
  }
</style>
