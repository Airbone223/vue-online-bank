<template>
<app-page back title="Помощь">
  <question-item
  v-for="q in questions"
  :key="q.title"
  :question="q"
  ></question-item>
</app-page>
</template>

<script>
import AppPage from '@/components/ui/AppPage'
import QuestionItem from '@/components/question/QuestionItem'

export default {
  setup() {
    const questions = [
      {title:'Как оформить кредит?', text:'Связаться с нашим пердставителем.'},
      {title:'Максимальная сума заявки?', text:'Максимальная сумма 10000$.'},
      {title:'Как долго ждать оформления?', text:'Оформление занимает 1-3 рабочих дня.'},
      {title:'Можно ли конвертировать сумму заявки в другую валюту?', text:'Наш банк выдает кредиты только в долларах США.'}
    ]

    return {questions}
  },
components: {AppPage, QuestionItem}
}
</script>

<style scoped>

</style>
