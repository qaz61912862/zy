import { ref, onMounted, onUnmounted, Ref } from 'vue'

export default function useClickOutside (elementRef: Ref<null | HTMLElement>) {
  const isClickOutside = ref(false)
  const handleClickArea = (e: MouseEvent) => {
    if (elementRef.value) {
      if (elementRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = false
      } else {
        isClickOutside.value = true
      }
    }
  }
  onMounted(() => {
    document.addEventListener('click', handleClickArea)
  })
  onUnmounted(() => {
    document.removeEventListener('click', handleClickArea)
  })
  return {
    isClickOutside
  }
}
