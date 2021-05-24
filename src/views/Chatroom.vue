<template>
  <div class="container">
    <Navbar />
    <ChatWindow />
    <NewChatform />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import { useRouter } from 'vue-router'
import { watch } from 'vue'
import getProfile from '../composables/getProfile'
import NewChatform from '../components/NewChatform'
import ChatWindow from '../components/ChatWindow'

export default {
  setup() {
    const router = useRouter()
    const { user } = getProfile()
    watch(user, () => {
      if (!user.value) router.push({ name: 'Welcome' })
    })
  },
  components: { Navbar, NewChatform, ChatWindow }
}
</script>

<style>
nav {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
nav p {
  margin: 2px auto;
  font-size: 16px;
  color: #444;
}
nav p.email {
  font-size: 14px;
  color: #999;
}
</style>
