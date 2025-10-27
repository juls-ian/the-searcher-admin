# Scrapped codes in the MultiFileUploader

## handleFileChange()
### 1.0: improved
```javascript 
const handleFileChange = (e) => {
const selected = Array.from(e.target.files || [])  // This guards against undefined in case the event object is malformed (e.g., when testing or mocking).

  if (!selected.length) return

  // Validate & filter files (limit: 5MB)
  const validFiles = []
  const invalidFiles = []

  for (const file of selected) {
    if (file.size > 5 * 1024 * 1024) {
      invalidFiles.push(file.name)
    } else {
      validFiles.push(file)
    }
  }

  if (invalidFiles.length) {
    alert(`These files exceed 5MB:\n${invalidFiles.join('\n')}`)
  }

  if (!validFiles.length) return

  // Push valid files to local state
  files.value.push(...validFiles)
  emit('update:modelValue', files.value)

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
```