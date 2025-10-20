<script setup>
import {
  Cancel01Icon,
  Menu01Icon,
  Notification01Icon,
  Search02Icon,
  UserIcon,
} from '@hugeicons/core-free-icons/index'
import { HugeiconsIcon } from '@hugeicons/vue'
import { onMounted, onUnmounted, ref } from 'vue'

const surfaceDark = '#181818'
const isSearchActive = ref(false)
const currentDateTime = ref('') // current datetime
const emit = defineEmits(['click-menu'])

const toggleSearchbar = () => {
  isSearchActive.value = !isSearchActive.value
}

const handleMenuClick = () => {
  emit('click-menu')
}

// Datetime
const updateDateTime = () => {
  const now = new Date()
  // formatting
  const options = {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }
  currentDateTime.value = now.toLocaleDateString('en-US', options)
}

let intervalId = null

onMounted(() => {
  updateDateTime()
  intervalId = setInterval(updateDateTime, 60000) // update every minute
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <nav class="toolbar" :class="{ 'toolbar--search-active': isSearchActive }">
    <HugeiconsIcon
      class="toolbar__menu"
      :icon="Menu01Icon"
      :size="25"
      :color="surfaceDark"
      @click="handleMenuClick"
    />
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

      <button class="toolbar__search-button">
        <p>Search</p>
      </button>
    </div>

    <div class="toolbar__datetime">
      <p>
        {{ currentDateTime }}
      </p>
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
  box-shadow:
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;

  @include respond-to-mf(tablet-lg) {
    width: 80%;
    height: 6rem;
    margin: spacing(2);
    padding: 0 spacing(5);
    border-radius: 20px;
    justify-content: flex-start;
    gap: spacing(6);
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

  &__notification {
    @include respond-to-mf(tablet-lg) {
      justify-self: self-end;
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

    @include respond-to-mf(tablet-lg) {
      width: 30%;
      // margin-right: auto; // position on the left side
    }

    &-field {
      width: 0;
      height: 3rem;
      opacity: 0;
      // position: absolute;
      background-color: transparent; // make the  invisible when collapsed
      color: $text-dark-main;
      border: none;
      // box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
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

      @include respond-to-mf(tablet-lg) {
        display: block;
        position: relative;
        opacity: 1;
        width: 100%;
        font-size: $font-size-base;
        border-radius: 5px;
        padding-left: spacing(8);
        padding-right: spacing(16);
        outline: 1px solid $surface-dark;
        box-shadow: none;
      }
    }

    &-icon {
      cursor: pointer;
      transition: right 0.4s ease-in-out;
      position: relative;
      right: 0;
      flex-shrink: 0;
      opacity: 1;

      @include respond-to-mf(tablet-lg) {
        pointer-events: none;
        position: absolute;
        left: 0;
        padding-left: spacing(2);
      }
    }

    &-button {
      display: none;

      @include respond-to-mf(tablet-lg) {
        position: absolute;
        display: block;
        right: 0;
        background: $primary-accent;
        border-radius: 5px;
        padding: 0 spacing(1);
        margin-right: spacing(1);
        margin-left: spacing(10);
        cursor: pointer;
      }

      p {
        font-size: $font-size-sm;
      }
    }
  }

  &__datetime {
    display: none;

    p {
      color: $text-dark-main;
      font-weight: 500;
    }

    @include respond-to-mf(tablet-lg) {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      margin-right: auto; // position on the left side
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
}
</style>
