<template>
  <form @submit.prevent="submitHandler">
    <input
      type="text"
      required
      placeholder="display name"
      v-model="displayName"
    />
    <input type="email" required placeholder="email" v-model="email" />
    <input type="password" required placeholder="password" v-model="password" />
    <button>Sign Up</button>
    <div class="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import useSignup from '../composables/useSignup'
export default {
  setup() {
    const { error, signup } = useSignup()

    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const submitHandler = async () => {
      await signup(email.value, password.value, displayName.value)
    }

    return { displayName, email, password, submitHandler, error }
  }
}
</script>

<style></style>
