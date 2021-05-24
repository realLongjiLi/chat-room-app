<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="formattedItems" class="messages" ref="messages">
      <div v-for="item in formattedItems" :key="item.id" class="item">
        <span class="created-at">{{ item.createdAt }}</span>
        <span class="user">{{ item.user }}</span>
        <span class="message">{{ item.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from '../composables/getCollection'
import { formatDistanceToNow } from 'date-fns'
import { computed, ref, onUpdated } from 'vue'
export default {
  setup() {
    const { error, items } = getCollection('messages')
    const formattedItems = computed(() => {
      if (items.value) {
        return items.value.map((item) => {
          let time = formatDistanceToNow(item.createdAt.toDate())
          return { ...item, createdAt: time }
        })
      }
    })

    // auto-scroll
    const messages = ref(null)

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight
    })

    return { error, items, messages, formattedItems }
  }
}
</script>

<style scoped>
.chat-window {
  background: #fafafa;
  padding: 30px 20px;
}
.item {
  margin: 18px 0;
}
.created-at {
  display: block;
  color: #999;
  font-size: 12px;
  margin-bottom: 4px;
}
.user {
  font-weight: bold;
  margin-right: 6px;
}
.messages {
  max-height: 400px;
  overflow: auto;
}
</style>
