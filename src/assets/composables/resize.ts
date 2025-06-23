import { computed, onMounted, onUnmounted, ref } from 'vue'
import scss from '@/assets/styles/_variables.module.scss'

export function useResize() {
  const height = ref(window.innerHeight)
  const width = ref(window.innerWidth)

  function update(this: Window) {
    height.value = this.innerHeight
    width.value = this.innerWidth
  }

  const styles = computed(() => {
    return {
      '--max-height': `${height.value}px`,
      '--max-height--desktop': `calc(${height.value}px - ${scss.TASKBAR_HEIGHT})`,
      '--max-height--application': `calc(${height.value}px - ${scss.TASKBAR_HEIGHT})`,
      '--max-width': `${width.value}px`,
    }
  })

  function getAvailableWindowHeight(offsetHeight: number = 0, windowElement?: HTMLElement | null) {
    return `calc(${windowElement?.clientHeight || height.value}px - ${scss.TASKBAR_HEIGHT} - ${offsetHeight}px)`
  }

  onMounted(() => window.addEventListener('resize', update))
  onUnmounted(() => window.removeEventListener('resize', update))

  return { height, width, getAvailableWindowHeight, styles }
}
