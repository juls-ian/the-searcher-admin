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
