<script setup>
import { useAuthStore } from '@/stores/auth'
import { HugeiconsIcon } from '@hugeicons/vue'
import {
  Album02Icon,
  Archive02Icon,
  ArrowRightDoubleIcon,
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
import { onBeforeMount, onMounted, ref, watch } from 'vue'

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

const auth = useAuthStore()
const surfaceDark = '#181818'
const isExpanded = ref(true)
const windowWidth = ref(window.innerWidth)

defineProps({
  isVisible: {
    type: Boolean,
    required: true,
  },
})

// Add event listener: attach when component appears
onMounted(() => {
  // Whenever the screen resizes, call the function
  window.addEventListener('resize', handleResize)
  handleResize() // run once on load
})

// Remove event listener: detach
onBeforeMount(() => {
  window.removeEventListener('resize', handleResize)
})

// Watch for screen changes & auto reset navbar on mobile
watch(windowWidth, (newWidth) => {
  if (newWidth < 992) {
    // Always open on mobile
    isExpanded.value = true
  }
})

const handleLogout = async () => {
  await auth.logout()
  router.push({ name: 'login' })
}

const toggleNav = () => {
  isExpanded.value = !isExpanded.value

  if (isExpanded.value) console.log('nav is open')
  if (!isExpanded.value) console.log('nav is closed')
}

// Match the current screen width: in sync when resizing
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

const handleDropdownItemClicked = () => {
  // Only expand if navbar is condensed and on large tablets +
  if (!isExpanded.value && windowWidth.value >= 992) {
    isExpanded.value = true
  }
}
</script>

<template>
  <!--                                                            Vue's dynamic attribute binding || data-visible is a custom HTML data attribute-->
  <nav class="navbar" :class="{ 'navbar--condensed': !isExpanded }" :data-visible="isVisible">
    <div class="navbar__trigger" @click="toggleNav">
      <HugeiconsIcon
        :class="{ 'navbar__trigger-icon--rotated': isExpanded }"
        :icon="ArrowRightDoubleIcon"
        :size="25"
        :color="surfaceDark"
      />
    </div>

    <div class="navbar__header">
      <div class="navbar__logo">
        <img
          class="navbar__logo-photo"
          src="@/assets/logos/searcher-logo-base.webp"
          alt="user id photo"
        />
        <p class="navbar__logo-title">Administrator</p>
      </div>
      <hr class="navbar__divider navbar__divider-upper" />
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

      <hr class="navbar__divider navbar__divider-lower" />
    </div>

    <div class="navbar__list">
      <!-- Dashboard -->
      <div class="navbar__item navbar__dashboard">
        <RouterLink class="navbar__router" :to="{ name: 'home' }" active-class="active">
          <HugeiconsIcon :icon="DashboardSquare02Icon" :size="30" />
          <p v-show="isExpanded">Dashboard</p>
        </RouterLink>
      </div>

      <!-- Publisher -->
      <div class="navbar__item navbar__publisher">
        <NavDropdown
          label="Publisher"
          :icon="QuillWrite02Icon"
          :items="publisherItems"
          :props-visible="isExpanded"
          @item-clicked="handleDropdownItemClicked"
        />
      </div>

      <!-- Calendar -->
      <div class="navbar__item navbar__calendar">
        <RouterLink class="navbar__router" :to="{ name: 'calendar' }">
          <HugeiconsIcon :icon="Calendar01Icon" :size="30" />
          <p v-show="isExpanded">Calendar</p>
        </RouterLink>
      </div>

      <!-- Bulletin -->
      <div class="navbar__item navbar__bulletin">
        <NavDropdown
          label="Bulletin"
          :icon="StickyNote02Icon"
          :items="bulletinItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Multimedia -->
      <div class="navbar__item navbar__multimedia">
        <NavDropdown
          label="Multimedia"
          :icon="Album02Icon"
          :items="multimediaItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Archives -->
      <div class="navbar__item navbar__archives">
        <NavDropdown
          label="Archives"
          :icon="Archive02Icon"
          :items="archivesItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Issues -->
      <div class="navbar__item navbar__issues">
        <NavDropdown
          label="Issues"
          :icon="BookOpen02Icon"
          :items="issuesItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Segments -->
      <div class="navbar__item navbar__archive">
        <NavDropdown
          label="Segments"
          :icon="CellsIcon"
          :items="segmentItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Staff -->
      <div class="navbar__item navbar__archive">
        <NavDropdown
          label="Staff"
          :icon="UserGroup03Icon"
          :items="staffItems"
          :props-visible="isExpanded"
        />
      </div>

      <!-- Newsletter -->
      <div class="navbar__item navbar__newsletter">
        <RouterLink class="navbar__router">
          <HugeiconsIcon :icon="Mailbox01Icon" :size="30" />
          <p v-show="isExpanded">Newsletter</p>
        </RouterLink>
      </div>
    </div>

    <div class="navbar__logout">
      <button class="navbar__logout-button" @click.prevent="handleLogout">
        <HugeiconsIcon :icon="LogoutCircle02Icon" :size="30" />
        <p v-show="isExpanded">Logout</p>
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;

.navbar {
  width: 70%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
  overflow: visible;
  padding-top: spacing(10);
  position: relative; // for the pseudo-element
  background-image: url('@/assets/graphics/navbar-bg-1.webp');
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover; // show entire image
  transition:
    width 0.3s ease-in-out,
    padding 0.3s ease-in-out;

  /* MainLayout: Override widths when inside grid layout of .container parent
    "&" = parent selector
  */
  .container & {
    @include respond-to-mf(tablet-lg) {
      width: 250px; // fixed width

      &--condensed {
        width: 80px; // fixed width
      }
    }
  }

  // Hide nav in tablet-lg below devices
  @include respond-to-df(tablet-lg) {
    display: none;

    /* CSS attribute selector: show/hide navbar
      applies these style on the HTML data attribute (data-visible) binding above
    */
    &[data-visible='true'] {
      display: block;
      // position: fixed;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      animation: slideIn 0.3s ease-in-out;
    }
  }

  @include respond-to-mf(md) {
    width: 60%;

    &--condensed {
      width: auto;
    }
  }

  @include respond-to-mf(tablet-sm) {
    width: 40%;

    &--condensed {
      width: auto;
    }
  }

  @include respond-to-mf(desktop-sm) {
    padding: 0;
    width: 25%;
    height: 100vh;

    &--condensed {
      width: 15%;
    }
  }
  @include respond-to-mf(desktop-md) {
    padding: 0;
    width: 20%;
    height: 100vh;

    &--condensed {
      width: auto;
    }
  }

  &--condensed {
    width: 50%;
    // min-width: fit-content;
    padding-left: spacing(2);
    padding-right: spacing(2);
    transition:
      width 0.3s ease-in-out,
      padding 0.3s ease-in-out;

    @include respond-to-mf(tablet-lg) {
      width: 9%;
      align-items: start !important;
      justify-content: start !important;
    }

    @include respond-to-mf(desktop-sm) {
      width: 6%;
    }

    .navbar__item {
      margin-left: spacing(2);
      width: auto;
      justify-content: center;

      @include respond-to-mf(tablet-lg) {
        align-items: start !important;
        justify-content: start !important;
      }
    }

    .navbar__router {
      justify-content: center;
      padding: spacing(2);
      transition:
        width 0.3s ease-in-out,
        margin 0.3s ease-in-out;

      p {
        opacity: 0;
        /** not necessary */
        // transition:
        //   opacity 0.3s ease-in-out,
        //   width 0.3s ease-in-out;
      }

      &.active {
        border-radius: 20px;
        margin-left: calc(-1 * spacing(2));
        width: calc(100% + spacing(4));
        padding: spacing(3);
      }
    }

    .navbar__logo {
      @include respond-to-mf(tablet-lg) {
        justify-content: start;
        left: spacing(2);
      }

      &-title {
        @include respond-to-mf(tablet-lg) {
          opacity: 0;
          // transition: opacity 0.2s ease-in-out;
        }
      }

      &-photo {
        @include respond-to-mf(tablet-lg) {
          width: auto;
          max-width: 6rem;
        }
      }
    }

    .navbar__user-name,
    .navbar__user-position {
      @include respond-to-mf(tablet-lg) {
        // display: none;
        opacity: 0;
      }
    }

    .navbar__divider-upper {
      @include respond-to-mf(tablet-lg) {
        visibility: hidden;
      }
    }

    .navbar__user {
      justify-content: center;

      &-details {
        // width: 0;
      }

      &-icon {
        width: 7rem;
        height: 7rem;
      }
    }

    .navbar__logout {
      // padding-left: spacing(2);
      // padding-right: spacing(2);

      button {
        justify-content: center;
      }
    }
  }

  // Navbar content stay above overlay
  > * {
    position: relative;
    z-index: 1;
  }

  // Overlay
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(47, 46, 65, 0.5); // #2F2E41 @ 60% transparency
    z-index: 0;
  }

  &__trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: flex-end; // move to left
    width: 3rem;
    height: 3rem;
    background: $surface-light;
    border-radius: 50px;
    z-index: 3;
    cursor: pointer;
    // remove in document flow
    position: absolute;
    // top: 50%;
    right: -1.5rem;
    transform: translateY(-50%); // center vertically
    visibility: hidden;

    @include respond-to-mf(tablet-sm) {
      top: 5%;
    }

    @include respond-to-mf(tablet-lg) {
      visibility: visible;
    }

    &-icon {
      display: block; // removes inline spacing

      &--rotated {
        transform: rotate(180deg);
      }

      @include respond-to-mf(tablet-sm) {
      }
    }
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
    transition:
      width 0.3s ease-in-out,
      height 0.3s ease-in-out;

    @include respond-to-mf(desktop-sm) {
      flex-direction: row;
    }

    &-title {
      // display: none;
      text-transform: uppercase;
      font-weight: 700;
      position: absolute;
      opacity: 0;

      @include respond-to-mf(desktop-sm) {
        opacity: 1;
        position: relative;
        // Smooth transition
        transition:
          opacity 0.3s ease-in-out,
          transform 0.3s ease-in-out;
        // display: block;
        flex-direction: row;
      }
    }

    &-photo {
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
    margin-top: spacing(-7);
    gap: spacing(5);
    position: relative;
    transition: all 0.3s ease-in-out;

    @include respond-to-mf(tablet-lg) {
      margin-top: 0;
    }

    &-icon {
      width: 9rem;
      height: 9rem;
      border-radius: 50%;
      object-fit: cover;

      @include respond-to-mf(sm) {
        width: 10rem;
        height: 10rem;
      }

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

    &-details {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      overflow: hidden; // keep layout stable
      // max-width: 20rem;
      transition: all 0.3s ease-in-out;
    }

    &-name {
      font-size: $font-size-base;
      font-weight: 600;
      text-align: center;

      @include respond-to-mf(sm) {
        font-size: $font-size-lg;
      }

      @include respond-to-mf(desktop-sm) {
        font-size: $font-size-base;
      }
    }

    &-position {
      font-size: $font-size-sm;

      @include respond-to-mf(sm) {
        font-size: $font-size-base;
      }

      @include respond-to-mf(desktop-sm) {
        font-size: $font-size-sm;
      }
    }

    &-name,
    &-position {
      opacity: 1;
      transform: translateX(0);
      transition:
        opacity 0.3s ease-in-out,
        transform 0.3s ease-in-out;
      white-space: nowrap;
    }
  }

  &__divider {
    width: 100%;
    height: 1px;
    display: block;
    background: $surface-light;
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
        display: none;
      }
      @include respond-to-mf(desktop-sm) {
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
    overflow: visible;
    transition:
      width 0.3s ease-in-out,
      margin 0.3s ease-in-out;

    @include respond-to-mf(desktop-sm) {
      width: calc(100% - #{spacing(6)});
    }

    @include respond-to-mf(desktop-sm) {
      width: calc(95% - #{spacing(6)});
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
      color: $surface-light;
      flex: 1; // take up remaining space
      transition: opacity 0.2s ease-in-out;
    }
  }

  &__router {
    display: flex;
    flex-direction: row;
    gap: spacing(3);
    align-items: center;
    width: 100%;
    overflow: visible;
    transition: all 0.2s ease-in-out;
    transition: opacity 0.2s ease-in-out;

    p {
      opacity: 1;
      transition: opacity 0.2s ease-in-out;
    }

    svg {
      flex-shrink: 0;
      color: $surface-light;
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
    padding: spacing(6) spacing(4) spacing(5) spacing(4);
    cursor: pointer;
    position: sticky;
    bottom: 0;

    @include respond-to-df(tablet-sm) {
      // position: relative;
      background: rgba(24, 24, 24, 0.8);
    }

    button {
      display: flex;
      align-items: start;
      gap: spacing(3);

      cursor: pointer;

      &:hover {
        opacity: 0.8;
      }
    }
  }
}

.navbar-slide-enter-active,
.navbar-slide-leave-active {
  transition: all 0.3s ease-in-out;
}

.navbar-slide-enter-from,
.navbar-slide-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

.navbar-slide-enter-to,
.dropdown-slide-leave-from {
  opacity: 1;
}
</style>
