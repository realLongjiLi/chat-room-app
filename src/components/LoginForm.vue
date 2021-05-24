<template>
  <form @submit.prevent="submitHandler">
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <div class="error">{{ error }}</div>
    <button>Log In</button>
  </form>
</template>

<script>
import { ref } from 'vue'
import useLogin from '../composables/useLogin'
export default {
  setup() {
    const email = ref('')
    const password = ref('')

    const { error, login } = useLogin()
    const submitHandler = async () => {
      await login(email.value, password.value)
    }

    return { email, password, submitHandler, error }
  }
}
</script>

<style></style>
