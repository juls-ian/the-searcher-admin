# Scrapped codes in the FileUploader

## initial version 
```javascript
<script setup>
import { ref } from 'vue'

// Props: data from parent -> child (receive and )
const props = defineProps({
  fileType: {
    type: String,
    default: 'image', // 'image' | 'video' | 'pdf'
  },
  // current value: incoming data from parent (v-model)
  modelValue: {
    type: [File, null],
    default: null,
  },
})

// Emits: data from child -> parent
const emit = defineEmits(['update:modelValue'])
const file = ref(null) // file uploaded
const previewUrl = ref(null)

// Accepted file type mapping: MIME type filters
const acceptMap = {
  image: '.jpg,.jpeg,.png,.webp',
  // image: 'image/*',
  video: 'video/*',
  pdf: 'application/pdf',
}

const handleFileChange = (e) => {
  /**
   * e.target = input element
   * [0] is the first file if input doesn't allow multiple file
   */
  const selected = e.target.files[0]
  file.value = selected

  emit('update:modelValue', selected)

  // Generate preview for image or video
  if (props.fileType === 'image' || props.fileType === 'video') {
    previewUrl.value = URL.createObjectURL(selected)
  } else {
    previewUrl.value = null
  }
}
</script>
```
```html
<template>
  <div class="uploader">
    <!-- UPLOADER -->
    <!-- Vue creates a reference named fileInput -->
    <input
      type="file"
      :accept="acceptMap[key]"
      @change="handleFileChange"
      class="hidden"
      ref="fileInput"
    />

    <!-- Access DOM element: $refs.fileInput points to the actual hidden <input type="file"> element in the DOM -->
    <div class="uploader__area" @click="$refs.fileInput.click()">
      <img
        src="@/assets/illustrations/upload.svg"
        class="uploader__area-photo"
        alt="upload file illustration"
      />
      <h3 class="uploader__area-title">Drop your files here</h3>
      <p class="uploader__area-or">or</p>
      <button type="button" class="uploader__area-button">Browse</button>
      <p class="uploader__area-info">File must be in jpg, webp, or png and not exceed 5mb</p>
    </div>

    <!-- PREVIEW -->
    <div v-if="file" class="uploader__preview">
      <img v-if="fileType === 'image'" :src="previewUrl" />
      <video v-else-if="fileType === 'video'" :src="previewUrl" controls></video>
      <p v-else-if="fileType === 'pdf'">
        {{ file.name }}
      </p>
    </div>
  </div>
</template>
```
```scss
<style lang="scss" scoped>
.uploader {
  &__area {
    border: 2px solid black;
    text-align: center;
    cursor: pointer;

    &-photo {
      width: auto;
      height: 10rem;
    }
  }

  &__preview {
    margin-top: 4;
  }
}
</style>
```