<template>
  <component :is="layout + '-layout'" />
</template>

<script>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainLayout from '@/layouts/MainLayout'
import AdminLayout from '@/layouts/AdminLayout'
import AuthLayout from '@/layouts/AuthLayout'

export default {
  setup() {
   const route = useRoute()

    return {
     layout: computed(()=>route.meta.layout)
  }
    },
  components: { MainLayout, AuthLayout, AdminLayout }
}
</script>
