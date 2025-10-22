# Scrapped codes in the MainLayout.vue 

## click outside
### 1.0: using VueUse's onClickOutside 
```javascript
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
```

```html 
  <div class="container">
    <!-- Backdrop overlay -->
    <div v-if="isNavVisible" class="backdrop" ref="navRef"></div>
    <VerticalNav class="container__sidebar" :is-visible="isNavVisible" />
    <div class="container__right">
      <!-- Listen to click-menu event  -->
      <AppToolbar class="container__toolbar" @click-menu="toggleMenu" />
      <main class="container__workspace">
        <slot />
      </main>
    </div>
  </div>
```
### 1.1: using Transition 
```javascript
import AppToolbar from '@/components/navigation/AppToolbar.vue'
import VerticalNav from '@/components/navigation/VerticalNav.vue'
import { ref } from 'vue'

const isNavVisible = ref(false)

const toggleMenu = () => {
  isNavVisible.value = !isNavVisible.value
}

const closeNav = () => {
  isNavVisible.value = false
}
```
```html
<template>
  <div class="container">
    <!-- Backdrop overlay -->
    <Transition name="fade">
      <div v-if="isNavVisible" class="backdrop" @click="closeNav"></div>
    </Transition>

    <Transition name="slide">
      <VerticalNav class="container__sidebar" :is-visible="isNavVisible" />
    </Transition>
    <div class="container__right">
      <!-- Listen to click-menu event  -->
      <AppToolbar class="container__toolbar" @click-menu="toggleMenu" />
      <main class="container__workspace">
        <slot />
      </main>
    </div>
  </div>
</template>
```
```scss
.container {

// styles above remain the same

// Backdrop overlay styles
  // Backdrop overlay styles
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99; // Below navbar (z-index: 100) but above content

    @include respond-to-mf(tablet-lg) {
      display: none; // hide backdrop on desktop
    }
  }

  // Fade transitions for backdrop
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }

  // Slide transition of navbar
  .slide-enter-active,
  .fade-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-enter-from {
    transform: translateX(-100%);
  }

  .slide-enter-to,
  .slide-leave-from {
    transform: translateX(0);
  }
}
  ```