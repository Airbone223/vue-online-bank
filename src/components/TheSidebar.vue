<template>
  <div class="sidebar scroll" v-if="sidebar">
    <span class="sidebar-close" @click="close">&times;</span>
    <div class="sidebar-content" v-if="messages">
      <sidebar-messages v-for="msg of messages"
                        :id="msg.id"
                        :name="msg.fio"
                        :key="msg.id"
                        @remove = "deleteMessage"
      />
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import SidebarMessages from '@/components/ui/SidebarMessages'


export default {
  setup() {
    const store = useStore()
    const sidebar = computed(() => store.state.sidebar)
    onMounted(async () => {
      await store.dispatch('request/loadMessages')
    })
    const messages = computed(() => store.getters['request/messages'])
    const deleteMessage = async (data) => {
      console.log(data)
      await store.dispatch('request/removeMsg', data)
    }
    return {
      deleteMessage,
      messages,
      sidebar,
      close: () => store.commit('closeSidebar')
    }
  },
  components: {SidebarMessages}
}
</script>

<style scoped>
.scroll {
  overflow: scroll;
}
</style>
