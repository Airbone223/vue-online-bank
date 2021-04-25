<template>
  <main-navbar/>
  <div class="container with-nav">
    <app-message />
    <router-view/>
  </div>
</template>

<script>
import MainNavbar from '@/components/main/MainNavbar'
import AppMessage from '@/components/ui/AppMessage'
export default {
  components: {MainNavbar, AppMessage}
}
</script>

<style scoped>

</style>
