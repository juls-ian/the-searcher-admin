<script setup>
import AppToolbar from '@/components/navigation/AppToolbar.vue'
import VerticalNav from '@/components/navigation/VerticalNav.vue'
</script>

<template>
  <div class="container">
    <VerticalNav class="container__sidebar" />
    <div class="container__right">
      <AppToolbar class="container__toolbar" />
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
}
</style>
