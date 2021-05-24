import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/Welcome'
import Chatroom from '../views/Chatroom'
import getProfile from '../composables/getProfile'

const requireAuth = (to, from, next) => {
  const { user } = getProfile()
  if (!user.value) {
    next({ name: 'Welcome' })
  } else next()
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/chatroom',
    name: 'Chatroom',
    component: Chatroom,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
