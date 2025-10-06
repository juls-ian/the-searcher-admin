<script setup>
    import { useAuthStore } from '@/stores/auth';

    const auth = useAuthStore()

    // onMounted(() => {
    //     auth.fetchUser() // fetch data when page loads
    // })
</script>

<template>
    <div>
        <h1>{{ auth.fullName }}</h1>
        <h1>{{ auth.userRole }}</h1>
        <h1>{{ auth.penName }}</h1>
    </div>


</template>

<style lang="scss">
    h1 {
        color: chartreuse;
    }
</style>