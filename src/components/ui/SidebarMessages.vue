<template>
  <div class="sidebar-msg-box">
    <p>Поступила новая заявка от <strong>{{name}}</strong></p>
    <button class="btn" @click="$emit('remove', id)">Прочесть</button>
  </div>
</template>

<script>
export default {
  emits: ['remove'],
  props: ['name', 'title', 'id']
}
</script>

<style scoped>
.btn {
  margin-bottom: 10px;
}
.sidebar-msg-box {
  margin-top: 10px;
  text-align: center;
  width: 100%;
  border-radius: 5px;
  background-color: #fff;
}
</style>
