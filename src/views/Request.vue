<template>
  <app-loader v-if="loading"/>



  <app-page back title="Заявка" v-else-if="request">
  <template #header>
    <button class="btn danger" @click="remove">Удалить</button>
  </template>
    <p><strong>Ф.И.О.</strong>: {{ request.fio }}</p>
    <p><strong>Телефон</strong>: {{ request.phone }}</p>
    <p><strong>Сумма</strong>: {{ currency(request.amount) }}</p>
    <p><strong>Статус</strong>:
      <app-status :type="request.status"/>
    </p>
    <div class="form-control">
      <label for="status">Изменить статус</label>
      <select id="status" v-model="status">
        <option value="done">Завершен</option>
        <option value="cancelled">Отменен</option>
        <option value="active">Активен</option>
        <option value="pending">Выполняется</option>
      </select>
    </div>
    <button class="btn" @click="update" v-if="hasChanged">Обновить</button>
  </app-page>
  <h3 v-else class="text-center text-white">
    Заявки с ID = {{ $route.params.id }} нет.
  </h3>

</template>

<script>
import {ref, onMounted, computed} from 'vue'
import {useStore} from 'vuex'
import {useRoute, useRouter} from 'vue-router'
import AppPage from '@/components/ui/AppPage'
import AppLoader from '@/components/ui/AppLoader'
import AppStatus from '@/components/ui/AppStatus'
import {currency} from '@/utils/currency-formator'

export default {
  setup() {
    const loading = ref(true)
    const request = ref({})
    const status = ref()
    const hasChanged = computed(() => request.value.status !== status.value)
    const route = useRoute()
    const router = useRouter()
    const store = useStore()
    onMounted(async () => {
      loading.value = true
      request.value = await store.dispatch('request/loadById', route.params.id)
      status.value = request.value?.status
      loading.value = false
    })
    const remove = async () => {
      await store.dispatch('request/remove', route.params.id)
      router.push('/admin')
    }
    const update =  async () => {
      const data = {...request.value, status: status.value, id: route.params.id}
      await store.dispatch('request/update', data)
      request.value.status = status.value
    }
    return {loading, request, currency, remove, update, status, hasChanged}
  },
  components: {AppPage, AppLoader, AppStatus}
}
</script>

<style scoped>

</style>
