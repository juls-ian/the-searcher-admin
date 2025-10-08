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
import NavDropdown from './NavDropdown.vue'
import router from '@/router'

const auth = useAuthStore()

const publisherItems = [
  { label: 'Publish', path: '/publisher/publish' },
  { label: 'Published', path: '/publisher/published' },
]

const bulletinItems = [
  { label: 'Post', path: '/bulletin/post-bulletin' },
  { label: 'Posted', path: '/bulletin/posted-bulletin' },
]

const multimediaItems = [
  { label: 'Upload', path: '/multimedia/upload' },
  { label: 'Uploaded', path: '/multimedia/uploaded' },
]

const archivesItems = [
  { label: 'Archive', path: '/archives/archive' },
  { label: 'Archived', path: '/archives/archived' },
]

const issuesItems = [
  { label: 'Release', path: '/issues/release' },
  { label: 'Released', path: '/issues/released' },
]

const segmentItems = [
  { label: 'Produce', path: '/segments/produce' },
  { label: 'Produced', path: '/segments/produced' },
]

const staffItems = [
  { label: 'Manager', path: '/staff/manager' },
  { label: 'Register', path: '/staff/register' },
  { label: 'Editorial Board', path: '/editorial-board' },
]

const handleLogout = async () => {
  await auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <nav class="navbar">
    <div class="navbar__header">
      <div class="navbar__logo">
        <img src="@/assets/logos/searcher-logo-base.webp" alt="user id photo" />
        <p>Administrator</p>
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
            <!-- James Landon Villanueva -->
          </strong>
          <p class="navbar__user-position">
            {{ auth.user.board_position }}
          </p>
        </div>
      </div>

      <hr class="navbar__divider" />
    </div>

    <div class="navbar__list">
      <!-- Dashboard -->
      <div class="navbar__item navbar__dashboard">
        <RouterLink class="navbar__router" :to="{ name: 'home' }" active-class="active">
          <HugeiconsIcon :icon="DashboardSquare02Icon" :size="30" color="$text-light-main" />
          <p>Dashboard</p>
        </RouterLink>
      </div>

      <!-- Publisher -->
      <div class="navbar__item navbar__publisher">
        <NavDropdown label="Publisher" :icon="QuillWrite02Icon" :items="publisherItems" />
      </div>

      <!-- Calendar -->
      <div class="navbar__item navbar__calendar">
        <RouterLink class="navbar__router" :to="{ name: 'calendar' }">
          <HugeiconsIcon :icon="Calendar01Icon" :size="30" color="$text-light-main" />
          <p>Calendar</p>
        </RouterLink>
      </div>

      <!-- Bulletin -->
      <div class="navbar__item navbar__bulletin">
        <NavDropdown label="Bulletin" :icon="StickyNote02Icon" :items="bulletinItems" />
      </div>

      <!-- Multimedia -->
      <div class="navbar__item navbar__multimedia">
        <NavDropdown label="Multimedia" :icon="Album02Icon" :items="multimediaItems" />
      </div>

      <!-- Archives -->
      <div class="navbar__item navbar__archives">
        <NavDropdown label="Archives" :icon="Archive02Icon" :items="archivesItems" />
      </div>

      <!-- Issues -->
      <div class="navbar__item navbar__issues">
        <NavDropdown label="Issues" :icon="BookOpen02Icon" :items="issuesItems" />
      </div>

      <!-- Segments -->
      <div class="navbar__item navbar__archive">
        <NavDropdown label="Segments" :icon="CellsIcon" :items="segmentItems" />
      </div>

      <!-- Staff -->
      <div class="navbar__item navbar__archive">
        <NavDropdown label="Staff" :icon="UserGroup03Icon" :items="staffItems" />
      </div>

      <!-- Newsletter -->
      <div class="navbar__item navbar__newsletter">
        <RouterLink class="navbar__router">
          <HugeiconsIcon :icon="Mailbox01Icon" :size="30" color="$text-light-main" />
          <p>Newsletter</p>
        </RouterLink>
      </div>
    </div>

    <div class="navbar__logout">
      <HugeiconsIcon :icon="LogoutCircle02Icon" :size="30" color="$text-light-main" />
      <button class="navbar__logout-button" @click.prevent="handleLogout">
        <p>Logout</p>
      </button>
    </div>
  </nav>
</template>

<style lang="scss">
@use '@/assets/utils' as *;

.navbar {
  width: 70%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow: hidden;
  overflow-y: auto;
  padding-top: spacing(10);
  position: relative; // for the pseudo-element
  background-image: url('@/assets/graphics/navbar-bg-1.webp');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover; // show entire image

  @include respond-to-mf(desktop-sm) {
    padding: 0;
    width: 17%;
    height: 100vh;
  }

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

  &__header {
    width: 100%;
  }

  &__logo {
    display: flex;
    flex-direction: column;
    gap: spacing(1);
    align-items: center;
    position: relative;
    margin-bottom: spacing(3);

    @include respond-to-mf(desktop-sm) {
      flex-direction: row;
    }

    p {
      display: none;
      text-transform: uppercase;
      font-weight: 700;

      @include respond-to-mf(desktop-sm) {
        display: block;
        flex-direction: row;
      }
    }

    img {
      width: 100%;
      height: auto;
      max-width: 40%;

      @include respond-to-mf(xs) {
        display: none;
      }

      @include respond-to-mf(tablet-lg) {
      }

      @include respond-to-mf(desktop-sm) {
        display: block;
        width: 100%;
        max-width: 35%;
        height: auto;
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

      @include respond-to-mf(desktop-sm) {
        width: 8rem;
        height: 8rem;
      }
    }

    @include respond-to-mf(xs) {
      flex-direction: row;
    }

    @include respond-to-mf(tablet-lg) {
      flex-direction: row;
    }

    @include respond-to-mf(desktop-sm) {
      text-align: start;
    }
  }

  &__user-name {
    font-size: $font-size-lg;
    font-weight: 600;
    text-align: center;

    @include respond-to-mf(desktop-sm) {
      font-size: $font-size-base;
    }
  }

  &__user-position {
    font-size: $font-size-base;

    @include respond-to-mf(desktop-sm) {
      font-size: $font-size-sm;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    display: block;
    background: $surface-soft;
    margin-top: spacing(7);
    margin-bottom: spacing(5);
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

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
    padding-bottom: spacing(10);
    gap: spacing(8);
    flex-grow: 1; // ensures list fills available space
    overflow-block: inherit;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
    }

    // Hide scrollbar for IE, Edge and Firefox
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
  }

  &__item {
    display: flex;
    margin-left: spacing(4);
    //  100% - 40px: take 100% of the container’s width, then subtract some value from i
    width: calc(100% - #{spacing(10)}); // compensate for parent's margin-left

    @include respond-to-mf(desktop-sm) {
      width: calc(100% - #{spacing(6)});
    }

    @include respond-to-mf(desktop-sm) {
      width: calc(100% - #{spacing(6)});
    }

    &:hover {
      opacity: 0.8;
    }

    // Remove any width constraints from direct children
    > .router {
      width: 100%;
    }

    // Wrap icon and link together
    > *:not(.navbar__arrow-icon) {
      flex-shrink: 0; // prevent shrinking
    }

    p {
      color: $text-light-main;
      flex: 1; // take up remaining space
    }
  }

  &__router {
    display: flex;
    flex-direction: row;
    gap: spacing(3);
    align-items: center;
    width: 100%;
    transition: all 0.2s ease;

    svg {
      color: $text-light-main;
    }

    &.active {
      position: relative;

      background: rgba(75, 85, 99, 0.7);
      border-radius: 0 50px 50px 0;
      padding: spacing(3) spacing(5) spacing(3) spacing(4);

      // Extend to left edge of navbar (0px left)
      margin-left: calc(-1 * spacing(4)); // cancel navbar__list margin
      width: calc(75% + spacing(4)); // extend full width

      @include respond-to-mf(desktop-sm) {
        margin-left: calc(-1 * spacing(4));
        width: calc(75% + spacing(4));
      }
    }
  }

  &__arrow-icon {
    margin-left: auto; // push to right
    flex-shrink: 0; // prevent icon from shrinking
  }

  &__logout {
    width: 100%;
    margin-top: auto;
    display: flex;
    align-items: center;
    gap: spacing(3);
    padding: spacing(6) spacing(4) spacing(5) spacing(4);
    cursor: pointer;
    position: sticky;
    bottom: 0;
  }
}
</style>
