import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const useCollection = (collection) => {
  const error = ref(null)
  const addItem = async (item) => {
    error.value = null
    try {
      await projectFirestore.collection(collection).add(item)
      error.value = null
    } catch (err) {
      error.value = err.message
    }
  }
  return { error, addItem }
}

export default useCollection
