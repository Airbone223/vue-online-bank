<template>
  <div class="breadcrumbs" v-if="back">
    <router-link to="/admin" class="text-white">На главную</router-link>
  </div>
  <div class="breadcrumbs" v-if="backToMain">
    <router-link to="/" class="text-white">На главную</router-link>
  </div>
  <div class="card">
  <h1 class="card-title">{{ title }}
  <slot name="header"/>
  </h1>
   <slot />
  </div>
</template>

<script>
export default {
props: {
  title: {
    type: String,
    required: true
  },
  back: {
    type: Boolean,
    default: false
  },
  backToMain: {
    type: Boolean,
    default: false
  }
},
  setup(props) {
  document.title = `${props.title} | Онлайн Банк`
  }
}
</script>

<style scoped>

</style>
