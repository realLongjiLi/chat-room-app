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
  </form>
</template>

<script>
import { ref } from 'vue'
export default {
  setup() {
    const displayName = ref('')
    const email = ref('')
    const password = ref('')

    const submitHandler = () => {
      console.log(displayName.value, email.value, password.value)
    }

    return { displayName, email, password, submitHandler }
  }
}
</script>

<style></style>
