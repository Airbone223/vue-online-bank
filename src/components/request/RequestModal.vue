<template>
  <form @submit.prevent="onSubmit">
    <div class="form-control" :class="{invalid: fError}">
      <label for="fio">Ф.И.О.</label>
      <input type="text" id="fio" v-model="fio" @blur="fBlur">
      <small v-if="fError">{{ fError }}</small>
    </div>

    <div class="form-control" :class="{invalid: pError}">
      <label for="phone">Телефон</label>
      <input type="text" id="phone" v-model="phone" @blur="pBlur">
      <small v-if="pError">{{ pError }}</small>
    </div>

    <div class="form-control" :class="{invalid: aError}">
      <label for="amount">Сумма</label>
      <input type="text" id="amount" v-model="amount" @blur="aBlur">
      <small v-if="aError">{{ aError }}</small>
    </div>


      <input type="hidden" name="status" id="status" v-model="status">

    <button class="btn primary" :disabled="isSubmitting">Оформить</button>
  </form>
</template>

<script>
import {useRequestForm} from '@/use/request-form'
import {useStore} from 'vuex'

export default {
  emits: ['created'],
setup(_,{emit}) {
    const store = useStore()
  const submit = async values => {
    await store.dispatch('request/create', values)
    emit('created')
  }
  return {
    ...useRequestForm(submit)
  }
}
}
</script>

<style scoped>

</style>
