import { ref } from 'vue'
import { projectStorage } from '../firebase/config'

const useStorage = (dir) => {
  const error = ref(null)
  const storageRef = projectStorage.ref()

  const addItem = async (file) => {
    error.value = null
    const fileRef = storageRef.child(
      `${dir}/${file.name}${'_' +
        Math.random()
          .toString(36)
          .substr(2, 9)}`
    )
    const imgUrl = ref(null)
    try {
      const res = await fileRef.put(file)
      imgUrl.value = await res.ref.getDownloadURL()
      error.value = null
    } catch (err) {
      error.value = err.message
    }
    return imgUrl
  }
  return { error, addItem }
}

export default useStorage
