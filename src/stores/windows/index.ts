import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import { useResize } from '@/assets/composables/resize'
import { useWindowSettings } from './_settings'
import { useWindowUser } from './_login'

export interface iWindowVersion {
  logo: string
  name: string
  logoColored?: string
  value: string | number
}

export interface iApplication {
  active?: boolean
  mini?: boolean
  index?: number
  logo: string
  title: string
  component: object
  elementName?: string
}

export const versions: iWindowVersion[] = [
  {
    name: 'Windows Classic',
    logo: '/images/windows/windows-logo-1992',
    value: 1992,
  },
  {
    name: 'Windows NT',
    logo: '/images/windows/windows-logo-1992',
    value: 1992,
  },
  {
    name: 'Windows XP',
    logo: '/images/windows/windows-logo-2001',
    logoColored: '/images/windows/windows-logo-2001--colored',
    value: 2001,
  },
  {
    name: 'Windows 8',
    logo: '/images/windows/windows-logo-2012',
    value: 2012,
  },
  {
    name: 'Windows 10',
    logo: '/images/windows/windows-logo-2021',
    value: 2021,
  },
]
export const useWindowStore = defineStore('windowStore', () => {
  /** General */
  const version = ref(versions[0])
  const resize = useResize()
  /** Applications */
  const applications = ref(<iApplication[]>[])
  const minified = computed(() => applications.value.filter(({ mini = false }) => Boolean(mini)))
  function updateApplication(app: iApplication | never, del?: boolean) {
    if (app) {
      if (del) {
        applications.value = applications.value.filter(({ title }) => title !== app.title)
      } else {
        const index = applications.value.findIndex((item) => item.title === app?.title)
        if (index >= 0) applications.value[index] = { ...app, active: false, mini: false }
        else applications.value.push({ ...app, active: false, mini: false, index: applications.value.length })
      }
    }
  }

  function isAppActive(app: iApplication) {
    const item = applications.value.find((item) => item.title === app.title)
    return Boolean(item?.active)
  }

  return {
    ...resize,
    ...useWindowUser(),
    ...useWindowSettings(),
    applications,
    isAppActive,
    minified,
    updateApplication,
    version,
    versions,
  }
})
