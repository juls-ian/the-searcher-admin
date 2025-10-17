<script setup>
import {
  Menu01Icon,
  Notification01Icon,
  Search02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons/index'
import { HugeiconsIcon } from '@hugeicons/vue'

const surfaceDark = '#181818'
</script>

<template>
  <nav class="toolbar">
    <HugeiconsIcon class="toolbar__menu" :icon="Menu01Icon" :size="25" :color="surfaceDark" />
    <div class="toolbar__logo">
      <img
        src="@/assets/logos/searcher-logo-base.webp"
        class="toolbar__logo-photo"
        alt="the searcher logo"
      />
      <p class="toolbar__logo-title">The Searcher</p>
    </div>

    <HugeiconsIcon class="toolbar__search" :icon="Search02Icon" :size="25" :color="surfaceDark" />
    <HugeiconsIcon
      class="toolbar__notification"
      :icon="Notification01Icon"
      :size="25"
      :color="surfaceDark"
    />
    <HugeiconsIcon class="toolbar_user" :icon="UserIcon" :size="25" :color="surfaceDark" />
  </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;

.toolbar {
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 5rem;
  max-height: 5rem;
  background: $surface-soft;
  padding: spacing(2) spacing(3);
  background: $surface-soft;

  @include respond-to-mf(tablet-lg) {
    width: 100%;
    margin: spacing(2);
    border-radius: 20px;
  }

  &__menu {
    cursor: pointer;

    @include respond-to-mf(tablet-lg) {
      // display: none;
      visibility: hidden;
      position: absolute;
    }
  }

  &__logo {
    display: flex;
    align-items: center;

    @include respond-to-mf(tablet-lg) {
      // display: none;
      visibility: hidden;
      position: absolute;
    }

    &-photo {
      width: 100%;
      height: auto;
      max-width: 5rem;
      max-height: 5rem;
    }

    &-title {
      font-size: $font-size-sm;
      color: $text-dark-main;
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  &__search {
    cursor: pointer;
  }

  &__notification {
    cursor: pointer;
  }

  &__user {
    cursor: pointer;
  }
}
</style>
