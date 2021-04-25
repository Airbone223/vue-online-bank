<template>
  <div class="navbar">
<h3>OnlineBank</h3>
    <ul class="navbar-menu">
      <li>
      <router-link to="/admin">Заявки</router-link>
      </li>
      <li>
        <a href="#" @click.prevent="openSidebar">Сообщения</a>
      </li>
      <li>
        <a href="#" @click.prevent="logout">Выход</a>
      </li>
    </ul>
  </div>
</template>

<script>
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'

export default {
setup() {
  const router = useRouter()
  const store = useStore()
  return {
    openSidebar: () => store.commit('openSidebar'),
    logout: () => {
      store.commit('auth/logout')
      router.push('/auth')
    }
  }
}
}
</script>

<style scoped>

</style>
