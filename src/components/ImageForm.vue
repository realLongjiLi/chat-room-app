<template>
  <div class="upload">
    <input type="file" @change="onFileChanged" ref="inputFile" />
    <button @click="onUpload">Upload!</button>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script>
import { ref } from 'vue'
import useStorage from '../composables/useStorage'
export default {
  setup(props, context) {
    const inputFile = ref(null)
    const file = ref(null)
    const onFileChanged = (event) => {
      file.value = event.target.files[0]
    }
    const { error, addItem } = useStorage('images')
    const onUpload = async () => {
      // upload file
      const url = await addItem(file)
      if (!error.value) context.emit('imageUploaded', url.value)
      inputFile.value = null
    }
    return { onFileChanged, onUpload, error, inputFile }
  },
  emits: ['imageUploaded']
}
</script>

<style scoped>
.upload {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

input {
  width: 100%;
  padding: 10px;

  outline: none;
  color: #999;
  margin: 10px auto;
}
span {
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
}
button {
  margin: 20px auto;
}
</style>
