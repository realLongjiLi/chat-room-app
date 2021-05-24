<template>
  <nav v-if="user">
    <div>
      <p>Welcome back, {{ user.displayName }}</p>
      <p class="email">Currently logged in as {{ user.email }}</p>
    </div>

    <div class="error">{{ error }}</div>
    <button @click="logoutHandler">Log out</button>
  </nav>
</template>

<script>
import useLogout from '../composables/useLogout'
import getProfile from '../composables/getProfile'
export default {
  setup(props, context) {
    const { logout, error } = useLogout()
    const { user } = getProfile()
    const logoutHandler = async () => {
      await logout()
      context.emit('logout')
    }
    return { logout, error, logoutHandler, user }
  }
}
</script>

<style></style>
