# Guide for the component 

```javascript
import { ref } from 'vue'

// Props: data from parent -> child (receive and )
const props = defineProps({
  fileType: {
    type: String,
    default: 'image', // default string value
    validator: (value) => ['image', 'video', 'pdf'].includes(value),
  },
  // current value: incoming data from parent (v-model)
  modelValue: {
    type: [File, null],
    default: () => [],
  },
})

// Emits: data from child -> parent
const emit = defineEmits(['update:modelValue'])

// LOCAL STATES
const files = ref([]) // files uploaded
const previews = ref([])
const isDragging = ref(false)
const uploadProgress = ref(0)
const isUploading = ref(false)
const fileInput = ref(null)

// Accepted file type mapping: MIME type filters
const acceptMap = {
  image: '.jpg,.jpeg,.png,.webp',
  // image: 'image/*',
  video: 'video/*',
  pdf: 'application/pdf',
}

/**
 * Handler 1: upload by clicking input
 * @change="handleFileChange"
 */
const handleFileChange = (e) => {
  const selected = Array.from(e.target.files) // Converts the FileList to an array.

  if (!selected.length) return // check length

  // Validate file size (5MB limit)
  for (const file of selected) {
    if (file.size > 5 * 1024 * 1024) {
      alert(`${file.name} exceeds 5MB limit`)
      return
    }
  }

  // Push valid files to local state
  files.value.push(...selected) 
  emit('update:modelValue', files.value)

  // Simulated upload progress (per batch)
  isUploading.value = true
  uploadProgress.value = 0

  // Progress bar simulation
  const interval = setInterval(() => {
    uploadProgress.value += 10

    if (uploadProgress.value >= 100) {
      clearInterval(interval)
      isUploading.value = false
    }
  }, 100)

  // Generate preview for image or video
  if (props.fileType === 'image' || props.fileType === 'video') {
    const newPreviews = selected.map((f) => URL.createObjectURL(f))
    previews.value.push(...newPreviews)
  }
}

/**
 * Handler 2: upload by dragging
 * @drop: Handles the file once the user drops it on the uploader
 */
const handleDroppedFile = (e) => {
  e.preventDefault()
  isDragging.value = false

  const droppedFile = Array.from(e.dataTransfer.files) // get all files
  if (droppedFile.length) {
    // mock event object with all files
    handleFileChange({ target: { files: droppedFile } }) // pass array directly
  }
}

/**
 * Handler 3:
 * @dragleave: Detect when the dragged file leaves the drop zone area
 * preventing browser's default behavior
 */
const handleDragLeave = (e) => {
  e.preventDefault()
  isDragging.value = true
}

/**
 * Handler 4: Allow the file to be dragged over the uploader area
 * without browser opening it
 */
const handleDragOver = (e) => {
  e.preventDefault()
  isDragging.value = false
}

const removeFile = (index) => {
  files.value.splice(index, 1)
  previews.value.splice(index, 1)
  uploadProgress.value = 0
  isUploading.value = false

  emit('update:modelValue', files.value)
  //  Reset the actual <input type="file" so the same file can be uploaded again later>
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
```
```html 
  <div class="uploader">
    <!-- UPLOADER -->
    <!-- Vue creates a reference named fileInput -->
    <input
      type="file"
      :accept="acceptMap[fileType]"
      @change="handleFileChange"
      class="uploader__input"
      ref="fileInput"
      multiple
    />

    <!-- UPLOADER AREA -->
    <!-- Access DOM element: $refs.fileInput points to the actual hidden <input type="file"> element in the DOM -->
    <div
      class="uploader__area"
      @click="$refs.fileInput.click()"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDroppedFile"
    >
      <!-- Content  -->
      <div class="uploader__area-content">
        <img
          src="@/assets/illustrations/upload.svg"
          class="uploader__area-photo"
          alt="upload file illustration"
        />
        <p class="uploader__area-title">Drop your files here</p>
        <p class="uploader__area-or">or</p>
        <button type="button" class="uploader__area-button">Browse</button>
        <p class="uploader__area-info">Files must be in jpg, webp, or png and not exceed 5mb</p>
      </div>
    </div>

    <!-- PREVIEW -->
    <div v-for="(file, index) in files" class="uploader__file">
      <div class="uploader__file-icon">
        <!-- Uploaded file preview -->
        <template v-if="previews[index]">
          <!-- Image preview -->
          <img
            v-if="fileType === 'image'"
            :src="previews[index]"
            alt="File preview"
            class="uploader__file-thumbnail"
          />
          <!-- Video preview -->
          <video
            v-else-if="fileType === 'video'"
            :src="previews[index]"
            controls
            class="uploader__file-thumbnail"
          ></video>
        </template>
        <!-- PDF or fallback -->
        <template v-else>
          <svg v-if="fileType === 'pdf'" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"
              fill="currentColor"
            />
          </svg>
          <span v-else>{{ (props.fileType || 'FILE').toUpperCase() }}</span>
        </template>
      </div>

      <!-- FILE INFO  -->
      <div class="uploader__file-info">
        <!-- File name -->
        <p class="uploader__file-name">{{ file.name }}</p>
        <!-- Progress bar -->
        <div class="uploader__file-progress">
          <div class="uploader__file-progress-bar" :style="{ width: uploadProgress + '%' }"></div>
        </div>
        <!-- File size info  -->
        <p class="uploader__file-size">{{ formatFileSize(file.size) }}</p>
      </div>

      <!-- Remove uploaded file -->
      <button
        type="button"
        class="uploader__file-remove"
        @click="removeFile(index)"
        aria-label="Remove file"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
```
