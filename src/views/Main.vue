<template>
  <app-page title="Оформить заявку">
    <template #header>
      <button class="btn primary" @click="modal = true">Оформить сейчас</button>
    </template>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">
        <request-modal @created="modal = false"></request-modal>
      </app-modal>
    </teleport>

  </app-page>
<main-page/>
</template>

<script>
import {ref} from 'vue'
import AppPage from '@/components/ui/AppPage'
import AppModal from '@/components/ui/AppModal'
import RequestModal from '@/components/request/RequestModal'
import MainPage from '@/components/main/MainPage'


export default {
  setup() {
    const modal = ref(false)

    return {
      modal
    }
  },
  components: {AppPage, AppModal, RequestModal, MainPage}
}
</script>
