import { computed, reactive } from 'vue'

export function useWindowSettings() {
  const settings = reactive({
    background: '',
    font: '',
    color: '#fff',
    logo: '/images/windows/windows-logo-1992.svg',
  })

  const hasUrlBackground = computed(() => String(settings.background).includes('http'))

  return { settings, hasUrlBackground }
}
