import { ref } from 'vue'
import { projectAuth } from '../firebase/config'

const user = ref()

projectAuth.onAuthStateChanged((_user) => {
  user.value = _user
})

const getProfile = () => {
  return { user }
}

export default getProfile
