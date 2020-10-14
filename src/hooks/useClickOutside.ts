import { ref, onMounted, onUnmounted, Ref } from 'vue'
export default function useClickOutside (elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  const handleListener = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
        console.log(isClickOutside.value)
      } else {
        isClickOutside.value = true
        console.log(isClickOutside.value)
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleListener)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleListener)
  })
  return {
    isClickOutside
  }
}
