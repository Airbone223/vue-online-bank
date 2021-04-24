<template>
  <h3 v-if="!requests.length" class="text-center">Заявок пока нет...</h3>
  <table v-else class="table">
    <thead>
    <tr>
      <th>#</th>
      <th>Ф.И.О</th>
      <th>Телефон</th>
      <th>Сумма</th>
      <th>Статус</th>
      <th>Действия</th>

    </tr>
    </thead>
    <tbody>
 <tr v-for="(req, idx) in requests" :key="req.id">
   <td>{{ idx+1 }}</td>
   <td>{{ req.fio }}</td>
   <td>{{ req.phone }}</td>
   <td>{{ currency(req.amount) }}</td>
   <td><app-status :type="req.status"/></td>
   <td>

   <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: req.id}}">
     <button class="btn" @click="navigate">Открыть</button>
   </router-link>
   </td>

 </tr>
    </tbody>
  </table>
</template>

<script>
import {currency} from '@/utils/currency-formator'
import AppStatus from '@/components/ui/AppStatus'

export default {
props: ['requests'],
  setup() {
  return {currency}
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>
