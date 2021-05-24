<template>
  <form action="" @submit.prevent="submitHandler">
    <textarea
      placeholder="Type message"
      v-model="message"
      @keypress.enter.prevent="submitHandler"
    >
    </textarea>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import getProfile from '../composables/getProfile'
import { timestamp } from '../firebase/config'
import useCollection from '../composables/useCollection'
export default {
  setup() {
    const message = ref('')
    const { user } = getProfile()
    const { error, addItem } = useCollection('messages')
    const submitHandler = async () => {
      const chat = {
        message: message.value,
        user: user.value.displayName,
        createdAt: timestamp()
      }
      await addItem(chat)
      if (!error.value) message.value = ''
    }
    return { message, submitHandler, error }
  }
}
</script>

<style scoped>
form {
  margin: 10px;
}
textarea {
  width: 100%;
  max-width: 100%;
  margin-bottom: 6px;
  padding: 10px;
  box-sizing: border-box;
  border: 0;
  border-radius: 20px;
  font-family: inherit;
  outline: none;
}
</style>
