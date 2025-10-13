import { onBeforeMount, onMounted, ref } from 'vue'

export function useWindowWidth() {
  const windowWidth = ref(window.innerWidth)
  const handleSize = () => (windowWidth.value = window.innerWidth)

  onMounted(() => window.addEventListener('resize', handleSize))
  onBeforeMount(() => window.removeEventListener('resize', handleSize))

  return windowWidth
}
