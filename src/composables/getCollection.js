import { ref } from 'vue'
import { projectFirestore } from '../firebase/config'

const getCollection = (collection) => {
  const error = ref(null)
  const items = ref(null)

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy('createdAt')

  collectionRef.onSnapshot(
    (snap) => {
      let currItems = []
      snap.docs.forEach((item) => {
        item.data().createdAt && currItems.push({ ...item.data(), id: item.id })
      })
      items.value = currItems
      error.value = null
    },
    (err) => {
      items.value = null
      error.value = err.message
    }
  )

  return { error, items }
}

export default getCollection
