<template>
  <div class="upload">
    <!-- <input type="file" @change="onFileChanged" ref="inputFile" />
    <button @click="onUpload">Upload!</button> -->
    <div class="mb-3">
      <label for="formFile" class="form-label">Upload your file here</label>
      <input
        class="form-control"
        @change="onFileChanged"
        ref="inputFile"
        type="file"
        id="formFile"
      />
    </div>
    <div class="error">{{ error }}</div>
    <div>
      <button @click="onUpload">Upload!</button>
    </div>
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
      if (!file.value) {
        error.value = 'No file to upload yet'
        return
      }
      const url = await addItem(file.value)
      if (!error.value) context.emit('imageUploaded', url.value)
      inputFile.value.value = ''
    }
    return { onFileChanged, onUpload, error, inputFile }
  },
  emits: ['imageUploaded']
}
</script>

<style scoped>
.upload {
  padding: 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

input {
  width: 80%;
}
</style>
