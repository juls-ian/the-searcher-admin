# Unused codes in VerticalNav

## Full Component 

### 1.0: initial (without dropdown)
``` javascript
<script setup>
import { useAuthStore } from '@/stores/auth'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Album02Icon,
  Archive02Icon,
  ArrowRight01Icon,
  BookOpen02Icon,
  Calendar01Icon,
  CellsIcon,
  DashboardSquare02Icon,
  LogoutCircle02Icon,
  Mailbox01Icon,
  QuillWrite02Icon,
  StickyNote02Icon,
  UserGroup03Icon,
} from '@hugeicons/core-free-icons/index'

const auth = useAuthStore()

</script>
```
``` html
<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <img src="@/assets/logos/searcher-logo-base.webp" alt="user id photo" />
    </div>
    <hr class="navbar__divider" />
    <div class="navbar__user">
      <img
        src="@/assets/photos/teams/andrew.webp"
        class="navbar__user-icon"
        alt="user profile picture"
      />
      <div class="navbar__user-details">
        <strong class="navbar__user-name">
          {{ auth.fullName }}
        </strong>
        <p class="navbar__user-position">
          {{ auth.user.board_position }}
        </p>
      </div>
    </div>

    <hr class="navbar__divider" />

    <div class="navbar__list">
      <div class="navbar__item navbar__dashboard">
        <HugeiconsIcon :icon="DashboardSquare02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Dashboard</p>
        </RouterLink>
      </div>

      <div class="navbar__item navbar__publisher">
        <HugeiconsIcon :icon="QuillWrite02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Publisher</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__calendar">
        <HugeiconsIcon :icon="Calendar01Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Calendar</p>
        </RouterLink>
      </div>

      <div class="navbar__item navbar__bulletin">
        <HugeiconsIcon :icon="StickyNote02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Bulletin</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__multimedia">
        <HugeiconsIcon :icon="Album02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Multimedia</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__archive">
        <HugeiconsIcon :icon="Archive02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Archive</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__issues">
        <HugeiconsIcon :icon="BookOpen02Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Issues</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__archive">
        <HugeiconsIcon :icon="CellsIcon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Segments</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__archive">
        <HugeiconsIcon :icon="UserGroup03Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Staffs</p>
        </RouterLink>
        <HugeiconsIcon
          class="navbar__arrow-icon"
          :icon="ArrowRight01Icon"
          :size="25"
          color="$text-light-main"
        />
      </div>

      <div class="navbar__item navbar__archive">
        <HugeiconsIcon :icon="Mailbox01Icon" :size="30" color="$text-light-main" />
        <RouterLink>
          <p>Newsletter</p>
        </RouterLink>
      </div>

      <div class="navbar__item navbar__logout">
        <HugeiconsIcon :icon="LogoutCircle02Icon" :size="30" color="$text-light-main" />
        <Button>
          <p>Logout</p>
        </Button>
      </div>
    </div>
  </nav>
</template>
```
``` scss
<style lang="scss">
@use '@/assets/utils' as *;

.navbar {
  width: 70%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow: hidden;
  padding: spacing(10) 0;
  position: relative; // for the pseudo-element
  background-image: url('@/assets/graphics/navbar-bg-1.webp');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover; // show entire image

  // Overlay
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(47, 46, 65, 0.5); // #2F2E41 @ 60% transparency
    z-index: 0;
  }

  // Navbar content stay above overlay
  > * {
    position: relative;
    z-index: 1;
  }

  &__divider {
    width: 80%;
    height: 1px;
    display: block;
    background: $surface-soft;
    margin: spacing(5) 0;
    overflow: hidden;
    display: block;

    &:first-of-type {
      margin-top: spacing(-6);

      @include respond-to-mf(xs) {
        display: none;
      }

      @include respond-to-mf(tablet-lg) {
        display: block;
      }
    }

    &:last-of-type {
      @include respond-to-mf(xs) {
        width: 100%;
        display: block;
      }
    }
  }

  &__logo {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    img {
      width: 100%;
      height: auto;
      max-width: 40%;

      @include respond-to-mf(xs) {
        display: none;
      }

      @include respond-to-mf(tablet-lg) {
        display: flex;
      }
    }
  }

  &__user {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: spacing(3);
    margin-bottom: spacing(5);
    gap: spacing(5);

    &-icon {
      width: 10rem;
      height: 10rem;
      border-radius: 50%;
      object-fit: cover;
    }

    @include respond-to-mf(xs) {
      flex-direction: row;
    }

    @include respond-to-mf(tablet-lg) {
      flex-direction: column;
    }
  }

  &__user-name {
    font-size: $font-size-lg;
  }

  &__user-position {
    font-size: $font-size-base;
  }

  &__list {
    display: flex;
    flex-direction: column;
    align-items: start;
    margin-left: spacing(4);
    gap: spacing(8);
    flex-grow: 1; // ensures list fills available space
    overflow-y: auto;
    width: 100%;
  }

  &__item {
    display: flex;
    flex-direction: row;
    gap: spacing(3);
    align-items: center;
    width: calc(100% - #{spacing(10)}); // compensate for parent's margin-left

    // Wrap icon and link together
    > *:not(.navbar__arrow-icon) {
      flex-shrink: 0; // prevent shrinking
    }

    p {
      color: $text-light-main;
      flex: 1; // take up remaining space
    }
  }

  &__arrow-icon {
    margin-left: auto; // push to right
    flex-shrink: 0; // prevent icon from shrinking
  }

  &__logout {
    margin-top: auto;
    width: 100%;
    display: flex;
    align-items: center;
    gap: spacing(3);
    padding: spacing(3) spacing(1);
    cursor: pointer;
    position: sticky;
    bottom: 0;
  }
}
</style>
```


### 1.1: in-house nav dropdown
``` javascript
<script setup>
  import { useAuthStore } from '@/stores/auth';
  import { ref } from 'vue';
  import { HugeiconsIcon } from '@hugeicons/vue';
  import { Album02Icon, Archive02Icon, ArrowRight01Icon, BookOpen02Icon, Calendar01Icon, CellsIcon, DashboardSquare02Icon, LogoutCircle02Icon, Mailbox01Icon, NoteIcon, QuillWrite02Icon, StickyNote02Icon, UserGroup03Icon } from '@hugeicons/core-free-icons/index';

  const auth = useAuthStore()

  // Track which dropdown is open (only one at a time)
  const activeDropdown = ref(null)

  // Toggle dropdown
  const toggleDropdown = (itemName) => {
    if (activeDropdown.value === itemName) {
      activeDropdown.value = null // Close if already open
    } else {
      activeDropdown.value = itemName // Open the clicked one
    }
  }

  // Check if dropdown is open
  const isDropdownOpen = (itemName) => {
    return activeDropdown.value === itemName
  }

  // Define dropdown items for each menu
  const dropdownItems = {
    publisher: [
      { label: 'Create Article', path: '/publisher/create' },
      { label: 'My Drafts', path: '/publisher/drafts' },
      { label: 'Published', path: '/publisher/published' }
    ],
    bulletin: [
      { label: 'All Bulletins', path: '/bulletin/all' },
      { label: 'Create Bulletin', path: '/bulletin/create' }
    ],
    multimedia: [
      { label: 'Photos', path: '/multimedia/photos' },
      { label: 'Videos', path: '/multimedia/videos' },
      { label: 'Upload', path: '/multimedia/upload' }
    ],
    archive: [
      { label: 'View Archive', path: '/archive/view' },
      { label: 'Search', path: '/archive/search' }
    ],
    issues: [
      { label: 'Current Issues', path: '/issues/current' },
      { label: 'Past Issues', path: '/issues/past' },
      { label: 'Create Issue', path: '/issues/create' }
    ],
    segments: [
      { label: 'All Segments', path: '/segments/all' },
      { label: 'Manage Segments', path: '/segments/manage' }
    ],
    staffs: [
      { label: 'All Staff', path: '/staffs/all' },
      { label: 'Add Staff', path: '/staffs/add' },
      { label: 'Roles', path: '/staffs/roles' }
    ]
  }
</script>
```
``` html
<template>
  <nav class="navbar">
    <div class="navbar__logo">
      <img src="@/assets/logos/searcher-logo-base.webp" alt="user id photo">
    </div>
    <hr class="navbar__divider">
    <div class="navbar__user">
      <img src="@/assets/photos/teams/andrew.webp" class="navbar__user-icon" alt="user profile picture">
      <div class="navbar__user-details">
        <strong class="navbar__user-name">
          {{ auth.fullName }}
        </strong>
        <p class="navbar__user-position">
          {{ auth.user.board_position }}
        </p>
      </div>
    </div>

    <hr class="navbar__divider">

    <div class="navbar__list">
      <div class="navbar__item navbar__dashboard">
        <HugeiconsIcon :icon="DashboardSquare02Icon" :size="30" color=$text-light-main />
        <RouterLink to="/">
          <p>Dashboard</p>
        </RouterLink>
      </div>

      <!-- Publisher with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item navbar__publisher" @click="toggleDropdown('publisher')">
          <HugeiconsIcon :icon="QuillWrite02Icon" :size="30" color=$text-light-main />
          <p>Publisher</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('publisher') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('publisher')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.publisher" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <div class="navbar__item navbar__calendar">
        <HugeiconsIcon :icon="Calendar01Icon" :size="30" color=$text-light-main />
        <RouterLink to="/calendar">
          <p>Calendar</p>
        </RouterLink>
      </div>

      <!-- Bulletin with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item navbar__bulletin" @click="toggleDropdown('bulletin')">
          <HugeiconsIcon :icon="StickyNote02Icon" :size="30" color=$text-light-main />
          <p>Bulletin</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('bulletin') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('bulletin')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.bulletin" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- Multimedia with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item navbar__multimedia" @click="toggleDropdown('multimedia')">
          <HugeiconsIcon :icon="Album02Icon" :size="30" color=$text-light-main />
          <p>Multimedia</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('multimedia') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('multimedia')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.multimedia" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- Archive with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item navbar__archive" @click="toggleDropdown('archive')">
          <HugeiconsIcon :icon="Archive02Icon" :size="30" color=$text-light-main />
          <p>Archive</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('archive') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('archive')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.archive" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- Issues with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item navbar__issues" @click="toggleDropdown('issues')">
          <HugeiconsIcon :icon="BookOpen02Icon" :size="30" color=$text-light-main />
          <p>Issues</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('issues') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('issues')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.issues" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- Segments with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item" @click="toggleDropdown('segments')">
          <HugeiconsIcon :icon="CellsIcon" :size="30" color=$text-light-main />
          <p>Segments</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('segments') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('segments')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.segments" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <!-- Staffs with Dropdown -->
      <div class="navbar__item-wrapper">
        <div class="navbar__item" @click="toggleDropdown('staffs')">
          <HugeiconsIcon :icon="UserGroup03Icon" :size="30" color=$text-light-main />
          <p>Staffs</p>
          <HugeiconsIcon 
            class="navbar__arrow-icon" 
            :icon="ArrowRight01Icon" 
            :size="25" 
            color=$text-light-main 
            :class="{ 'navbar__arrow-icon--open': isDropdownOpen('staffs') }"
          />
        </div>
        <transition name="dropdown">
          <div v-if="isDropdownOpen('staffs')" class="navbar__dropdown">
            <RouterLink 
              v-for="item in dropdownItems.staffs" 
              :key="item.path" 
              :to="item.path" 
              class="navbar__dropdown-item"
            >
              {{ item.label }}
            </RouterLink>
          </div>
        </transition>
      </div>

      <div class="navbar__item">
        <HugeiconsIcon :icon="Mailbox01Icon" :size="30" color=$text-light-main />
        <RouterLink to="/newsletter">
          <p>Newsletter</p>
        </RouterLink>
      </div>

      <div class="navbar__item navbar__logout" @click="auth.logout">
        <HugeiconsIcon :icon="LogoutCircle02Icon" :size="30" color=$text-light-main />
        <p>Logout</p>
      </div>
    </div>
  </nav>
</template>
```
``` scss
<style lang="scss">
  @use '@/assets/utils' as *;

  .navbar {
    width: 70%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: start;
    overflow: hidden;
    padding: spacing(10) 0;
    position: relative;
    background-image: url('@/assets/graphics/navbar-bg-1.webp');
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(47, 46, 65, 0.5);
      z-index: 0;
    }

    >* {
      position: relative;
      z-index: 1;
    }

    &__divider {
      width: 80%;
      height: 1px;
      display: block;
      background: $surface-soft;
      margin: spacing(5) 0;
      overflow: hidden;

      &:first-of-type {
        margin-top: spacing(-6);

        @include respond-to-mf(xs) {
          display: none;
        }

        @include respond-to-mf(tablet-lg) {
          display: block;
        }
      }

      &:last-of-type {
        @include respond-to-mf(xs) {
          width: 100%;
          display: block;
        }
      }
    }

    &__logo {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;

      img {
        width: 100%;
        height: auto;
        max-width: 40%;

        @include respond-to-mf(xs) {
          display: none;
        }

        @include respond-to-mf(tablet-lg) {
          display: flex;
        }
      }
    }

    &__user {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-left: spacing(3);
      margin-bottom: spacing(5);
      gap: spacing(5);

      &-icon {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        object-fit: cover;
      }

      @include respond-to-mf(xs) {
        flex-direction: row;
      }

      @include respond-to-mf(tablet-lg) {
        flex-direction: column;
      }
    }

    &__user-name {
      font-size: $font-size-lg;
    }

    &__user-position {
      font-size: $font-size-base;
    }

    &__list {
      display: flex;
      flex-direction: column;
      align-items: start;
      margin-left: spacing(4);
      gap: spacing(8);
      flex-grow: 1;
      overflow-y: auto;
      width: 100%;
    }

    &__item-wrapper {
      width: calc(100% - #{spacing(10)});
    }

    &__item {
      display: flex;
      flex-direction: row;
      gap: spacing(3);
      align-items: center;
      width: 100%;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        opacity: 0.8;
      }

      >*:not(.navbar__arrow-icon) {
        flex-shrink: 0;
      }

      p {
        color: $text-light-main;
        flex: 1;
      }

      a {
        text-decoration: none;
        color: inherit;
      }
    }

    &__arrow-icon {
      margin-left: auto;
      flex-shrink: 0;
      transition: transform 0.3s ease;

      &--open {
        transform: rotate(90deg);
      }
    }

    &__dropdown {
      display: flex;
      flex-direction: column;
      margin-left: spacing(10);
      margin-top: spacing(3);
      gap: spacing(2);
      overflow: hidden;

      &-item {
        color: $text-light-main;
        text-decoration: none;
        padding: spacing(2) spacing(3);
        border-radius: 4px;
        transition: all 0.2s ease;
        font-size: $font-size-sm;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          padding-left: spacing(4);
        }

        &.router-link-active {
          background: rgba(255, 255, 255, 0.15);
          font-weight: 600;
        }
      }
    }

    &__logout {
      margin-top: auto;
      width: 100%;
      display: flex;
      align-items: center;
      gap: spacing(3);
      padding: spacing(3) spacing(1);
      cursor: pointer;
      position: sticky;
      bottom: 0;
      transition: opacity 0.2s ease;

      &:hover {
        opacity: 0.8;
      }
    }
  }

  // Dropdown transition animations
  .dropdown-enter-active,
  .dropdown-leave-active {
    transition: all 0.3s ease;
  }

  .dropdown-enter-from,
  .dropdown-leave-to {
    opacity: 0;
    max-height: 0;
  }

  .dropdown-enter-to,
  .dropdown-leave-from {
    opacity: 1;
    max-height: 500px;
  }
</style>
```

## active 
### 1.0: simple class + active class
``` html 
     <!-- Dashboard -->
      <div class="navbar__item navbar__dashboard">
        <RouterLink class="navbar__router" :to="{ name: 'home' }"  active-class="active">
          <HugeiconsIcon :icon="DashboardSquare02Icon" :size="30" color="$text-light-main" />
          <p>Dashboard</p>
        </RouterLink>
      </div>
```
``` scss
.active {
  position: relative;

  background: rgba(75, 85, 99, 0.7);
  border-radius: 0 50px 50px 0;
  padding: spacing(3) spacing(5) spacing(3) spacing(4);

  // Extend all the way to the left edge of navbar (0px left)
  margin-left: calc(-1 * spacing(4)); // cancel navbar__list margin
  width: calc(100% + spacing(4)); // extend full width

  @include respond-to-mf(desktop-sm) {
    margin-left: calc(-1 * spacing(4));
    width: calc(100% + spacing(4));
  }
}
```
### 1.0: BEM class + router-link-active
``` scss 
 &.router-link-active {
      position: relative;
      background: rgba(75, 85, 99, 0.7);
      border-radius: 0 50px 50px 0;
      padding: spacing(3) spacing(5) spacing(3) spacing(4);

      // Extend all the way to the left edge of navbar (0px left)
      margin-left: calc(-1 * spacing(4)); // cancel navbar__list margin
      width: 85%; // extend full width

      @include respond-to-mf(desktop-sm) {
        margin-left: calc(-1 * spacing(4));
      }
    }
  ```
