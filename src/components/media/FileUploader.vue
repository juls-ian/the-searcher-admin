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

// LOCAL STATES
const file = ref(null) // file uploaded
const previewUrl = ref(null)
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
  const selected = e.target.files[0] // take first file

  if (!selected) return

  // Validate file size (5MB limit)
  if (selected.size > 5 * 1024 * 1024) {
    alert('File size must not exceed 5MB')
    e.target.value = '' // reset input so they can reupload
    return
  }

  file.value = selected
  emit('update:modelValue', selected)

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
    previewUrl.value = URL.createObjectURL(selected)
  } else {
    previewUrl.value = null
  }
}

/**
 * Handler 2: upload by dragging
 * @drop: Handles the file once the user drops it on the uploader
 */
const handleDroppedFile = (e) => {
  e.preventDefault()
  isDragging.value = false

  const droppedFile = e.dataTransfer.files[0] // extract file
  if (droppedFile) {
    // Mock event object
    handleFileChange({ target: { files: [droppedFile] } })
  }
}

/**
 * Handler 3:
 * @dragleave: Detect when the dragged file leaves the drop zone area
 * preventing browser's default behavior
 */
const handleDragLeave = (e) => {
  e.preventDefault()
  isDragging.value = false
}

/**
 * Handler 4: Allow the file to be dragged over the uploader area
 * without browser opening it
 */
const handleDragOver = (e) => {
  e.preventDefault()
  isDragging.value = false
}

/**
 * Handler 5: remove uploaded file
 */
const removeFile = () => {
  file.value = null
  previewUrl.value = null
  uploadProgress.value = 0
  isUploading.value = false
  emit('update:modelValue', null)
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
</script>

<template>
  <div class="uploader">
    <!-- UPLOADER -->
    <!-- Vue creates a reference named fileInput -->
    <input
      type="file"
      :accept="acceptMap[fileType]"
      @change="handleFileChange"
      class="uploader__input"
      ref="fileInput"
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
        <p class="uploader__area-title">Drop your file here</p>
        <p class="uploader__area-or">or</p>
        <button type="button" class="uploader__area-button">Browse</button>
        <p class="uploader__area-info">File must be in jpg, webp, or png and not exceed 5mb</p>
      </div>
    </div>

    <!-- PREVIEW -->
    <div v-if="file" class="uploader__file">
      <div class="uploader__file-icon">
        <!-- Uploaded file preview -->
        <template v-if="previewUrl">
          <!-- Image preview -->
          <img
            v-if="fileType === 'image'"
            :src="previewUrl"
            alt="File preview"
            class="uploader__file-thumbnail"
          />
          <!-- Video preview -->
          <video
            v-else-if="fileType === 'video'"
            :src="previewUrl"
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
          <span v-else>{{ props.fileType.toUpperCase() }}</span>
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
        @click="removeFile"
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
</template>

<style lang="scss" scoped>
@use '@/assets/utils' as *;

.uploader {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border-radius: 1.5rem;
  background: $text-alt;
  padding: spacing(1);

  @include respond-to-mf(md) {
    padding: spacing(2);
    // width: 45%;
    margin: 0 0;
  }

  @include respond-to-mf(tablet-sm) {
    padding: spacing(5);
    // width: 50%;
  }

  @include respond-to-mf(tablet-lg) {
    // width: 60%;
  }

  @include respond-to-mf(desktop-sm) {
    // width: 40%;
  }

  &__input {
    display: none;
  }

  &__area {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background: $surface-fields;
    border-radius: 1.5rem;
    padding: 3rem 2rem;
    cursor: pointer;
    flex: 1;
    transition: all 0.3s ease;

    &:hover {
      outline: 1px dashed $surface-light;
      // box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
    }

    &-content {
      text-align: center;
    }

    &-photo {
      width: auto;
      height: 8rem;
      margin-bottom: 1rem;

      @include respond-to-mf(tablet-lg) {
        height: 9rem;
      }
      @include respond-to-mf(desktop-sm) {
        height: 10rem;
      }
    }

    &-title {
      color: $text-dark-main;
      font-size: $font-size-base;
      font-weight: 600;
    }
    &-or {
      color: $text-dark-main;
      font-size: $font-size-xs;
      font-weight: 300;
    }

    &-button {
      background: $primary-accent;
      color: $surface-light;
      border: none;
      padding: spacing(1) spacing(3);
      font-size: $font-size-sm;
      font-weight: 600;
      border-radius: 0.5rem;
      transition: background 0.3s ease;
      margin: spacing(1) 0 spacing(2) 0;
      cursor: pointer;

      &:hover {
        background: $primary-base;
      }
    }

    &-info {
      color: $text-dark-main;
      font-size: $font-size-xs;
      margin: 0;
      opacity: 0.9;
    }
  }

  &__file {
    display: flex;
    align-items: center;
    gap: spacing(1);
    padding: spacing(1) spacing(2);
    background: $surface-light;
    border: 1px solid $primary-muted;
    border-radius: 1rem;
    margin-top: spacing(2);

    &-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 4.8rem;
      height: 4.8rem;
      background: $surface-fields;
      border-radius: 0.5rem;
      // flex-shrink: 0;

      span {
        font-size: 0.75rem;
        font-weight: 600;
      }
    }

    &-thumbnail {
      max-width: 100%;
      height: auto;
      object-fit: contain;

      @include respond-to-mf(desktop-sm) {
        height: 7rem;
      }
    }

    &-info {
      flex: 1;
      min-width: 0;
    }

    &-name {
      font-size: $font-size-xs;
      font-weight: 500;
      color: $text-dark-main;
      margin: 0 0 0.5rem 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &-progress {
      width: 100%;
      height: 4px;
      background: $primary-base;
      border-radius: 2px;
      overflow: hidden;
      margin-bottom: 0.5rem;

      &-bar {
        height: 100%;
        width: var(--progress-width, 0%);
        background: $primary-accent;
        border-radius: 2px;
        transition: width 0.3s ease;
      }
    }

    &-size {
      font-size: 0.75rem;
      color: #6b7280;
      margin: 0;
    }

    &-remove {
      background: transparent;
      border: none;
      color: $primary-accent;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.2s ease;
      // flex-shrink: 0;

      &:hover {
        background: #fee2e2;
      }

      svg {
        display: block;
      }
    }
  }
}
</style>
