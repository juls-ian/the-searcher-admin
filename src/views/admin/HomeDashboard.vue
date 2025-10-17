<script setup>
import VerticalNav from '@/components/navigation/VerticalNav.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

// onMounted(() => {
//     auth.fetchUser() // fetch data when page loads
// })
</script>

<template>
  <MainLayout>
    <h1>Home Dashboard</h1>
    <h1>Home Dashboard</h1>
    <h1>Home Dashboard</h1>

    <!-- <img
      src="@/assets/photos/teams/andrew.webp"
      class="navbar__user-icon"
      alt="user profile picture"
    /> -->
  </MainLayout>
</template>

<style lang="scss"></style>
