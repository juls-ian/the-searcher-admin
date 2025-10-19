<script setup>
import AppToolbar from '@/components/navigation/AppToolbar.vue'
import VerticalNav from '@/components/navigation/VerticalNav.vue'
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const isNavVisible = ref(false)
const navRef = ref(false)

const toggleMenu = () => {
  isNavVisible.value = !isNavVisible.value
}

// Close onClickOutside the nav
onClickOutside(navRef, () => {
  if (isNavVisible.value) {
    isNavVisible.value = false
  }
})

const closeNav = () => {
  isNavVisible.value = false
}
</script>

<template>
  <div class="container">
    <!-- Backdrop overlay -->
    <div v-if="isNavVisible" class="backdrop" @click="closeNav"></div>
    <VerticalNav class="container__sidebar" :is-visible="isNavVisible" />
    <div class="container__right">
      <!-- Listen to click-menu event  -->
      <AppToolbar class="container__toolbar" @click-menu="toggleMenu" />
      <main class="container__workspace">
        <slot />
      </main>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/utils' as *;

.container {
  height: 100dvh; // 100% of the visible viewport height (modern browsers)

  @include respond-to-mf(tablet-lg) {
    max-height: 100vh;

    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100vh;
    // grid-template-areas:
    //   'navigation toolbar'
    //   'navigation workspace';
  }

  &__sidebar {
    display: block;

    @include respond-to-mf(tablet-lg) {
      height: 100vh;
      overflow-y: auto; // scroll
      top: 0;
      position: sticky;
    }
  }

  &__right {
    @include respond-to-mf(tablet-lg) {
      height: 100vh;
      display: flex;
      flex-direction: column;
      // overflow-y: auto;
      padding-left: spacing(5);
      padding-right: spacing(5);
      overflow-x: hidden;
    }
  }

  &__toolbar {
    position: sticky;
    position: -webkit-sticky; // for safari
    z-index: 10;
    top: 0; // crucial to be sticky
    flex-shrink: 0;

    @include respond-to-mf(tablet-lg) {
      display: block;
      align-self: center;
      margin-top: spacing(5);
    }
  }

  &__workspace {
    flex: 1;
    padding: spacing(2);
    // overflow-y: auto;
  }

  // Backdrop overlay styles
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99; // Below navbar (z-index: 100) but above content
    animation: fadeIn 0.3s ease-in-out;

    @include respond-to-mf(tablet-lg) {
      display: none; // No backdrop needed on desktop
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
