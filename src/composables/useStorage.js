import { ref } from 'vue'
import { projectStorage } from '../firebase/config'

const useStorage = (dir) => {
  const error = ref(null)
  const storageRef = projectStorage.ref()

  const addItem = async (file) => {
    error.value = null
    const fileRef = storageRef.child(
      `${dir}/${file.value.name}${'_' +
        Math.random()
          .toString(36)
          .substr(2, 9)}`
    )
    const imgUrl = ref(null)
    try {
      await fileRef.put(file.value)
      error.value = null
    } catch (err) {
      error.value = err.message
    }
    try {
      const res = await fileRef.getDownloadURL()
      imgUrl.value = res
    } catch (error) {
      console.log(error.message)
    }
    return imgUrl
  }
  return { error, addItem }
}

export default useStorage
