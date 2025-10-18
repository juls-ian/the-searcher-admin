<script setup>
import {
  Cancel01Icon,
  Menu01Icon,
  Notification01Icon,
  Search02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons/index'
import { HugeiconsIcon } from '@hugeicons/vue'
import { ref } from 'vue'

const surfaceDark = '#181818'
const isSearchActive = ref(false)

const toggleSearchbar = () => {
  isSearchActive.value = !isSearchActive.value
}
</script>

<template>
  <nav class="toolbar" :class="{ 'toolbar--search-active': isSearchActive }">
    <HugeiconsIcon class="toolbar__menu" :icon="Menu01Icon" :size="25" :color="surfaceDark" />
    <div class="toolbar__logo">
      <img
        src="@/assets/logos/searcher-logo-base.webp"
        class="toolbar__logo-photo"
        alt="the searcher logo"
      />
      <p class="toolbar__logo-title">The Searcher</p>
    </div>

    <div class="toolbar__search">
      <input type="text" class="toolbar__search-field" placeholder="Search here..." autofocus />
      <HugeiconsIcon
        class="toolbar__search-icon"
        :icon="isSearchActive ? Cancel01Icon : Search02Icon"
        :size="25"
        :color="surfaceDark"
        @click="toggleSearchbar"
      />
    </div>

    <HugeiconsIcon
      class="toolbar__notification"
      :icon="Notification01Icon"
      :size="25"
      :color="surfaceDark"
    />
    <HugeiconsIcon class="toolbar__user" :icon="UserIcon" :size="25" :color="surfaceDark" />
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
  background: $surface-light;
  padding: spacing(2) spacing(3);
  background: $surface-light;

  @include respond-to-mf(tablet-lg) {
    width: 100%;
    margin: spacing(2);
    border-radius: 20px;
  }

  &__notification,
  &__user,
  &__menu,
  &__logo {
    cursor: pointer;
    flex-shrink: 0;
    opacity: 1;
    transition: opacity 0.3s ease-in-out 0.4s; // 0.4s delay to solve snap bug when closing search field
  }

  &__menu {
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
    display: flex;
    align-items: center;
    position: relative;
    transition: all 0.4s ease-in-out;

    &-field {
      width: 0;
      height: 3rem;
      opacity: 0;
      // position: absolute;
      background-color: transparent; // make the  invisible when collapsed
      color: $text-dark-main;
      border: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      border-radius: 24px;
      padding: spacing(2) spacing(5) spacing(2) spacing(2);
      transition:
        width 0.1s ease-in-out,
        opacity 0.6s ease-in-out,
        padding 0.3s ease-in-out;
      // transition:
      //   /* width - expand and close effect -> collapse width after opacity fades
      //   property | duration | timing-function | delay
      //   */
      //   opacity 0.4s ease-in-out,
      //   width 0.1s ease-in-out 0.1s,
      //   padding 0.4s ease-in-out,
      //   // white circle on collapse fix
      //   background-color 0.3s ease-in-out;
      outline: none;
    }

    &-icon {
      cursor: pointer;
      transition: right 0.4s ease-in-out;
      position: relative;
      right: 0;
      flex-shrink: 0;
      opacity: 1;
    }
  }

  &--search-active {
    .toolbar__menu,
    .toolbar__logo,
    .toolbar__notification,
    .toolbar__user {
      opacity: 0;
      display: none;
      // visibility: hidden;
      pointer-events: none;
      // transition:
      //   opacity 0.3s ease-in-out,
      //   visibility 0s 0.3s;
      animation: hideElement 0s forwards;
      animation-delay: 0.3s; // hide after fade
    }

    .toolbar__search {
      flex: 1;
      margin: 0 spacing(5);

      @include respond-to-mf(tablet-lg) {
      }

      &-field {
        width: 90%;
        opacity: 1;
        background-color: $surface-light; // restoring bg
        padding-right: spacing(6);
        z-index: 1;
        transition:
          opacity 0.3s ease-in-out 0s,
          width 0.4s ease-in-out 0s;
      }

      &-icon {
        position: absolute;
        right: spacing(2);
        z-index: 3;
      }
    }
  }

  // When not in search-active, make sure hidden elements fade back in before showing
  &:not(.toolbar--search-active) {
    .toolbar__menu,
    .toolbar__logo,
    .toolbar__notification,
    .toolbar__user {
      display: flex;
      animation: showElement 0s forwards;
      animation-delay: 0s;
    }
  }

  /** Keyframes to control when 'display' changes */
  @keyframes hideElement {
    to {
      display: none;
    }
  }

  @keyframes showElement {
    to {
      display: flex;
    }
  }
}
</style>
