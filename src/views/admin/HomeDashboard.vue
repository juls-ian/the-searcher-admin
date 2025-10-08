<script setup>
  import VerticalNav from '@/components/navigation/VerticalNav.vue';
  import { useAuthStore } from '@/stores/auth';

  const auth = useAuthStore()

  // onMounted(() => {
  //     auth.fetchUser() // fetch data when page loads
  // })
</script>

<template>
  <div>
    <VerticalNav />
  </div>


</template>

<style lang="scss">
  h1 {
    color: chartreuse;
  }
</style>
