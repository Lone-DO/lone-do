import { reactive, ref } from 'vue'
import { defineStore } from 'pinia'

export interface iWindowVersion {
  logo: string
  name: string
  logoColored?: string
  value: string | number
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
  const isLoggedIn = ref(false)
  const version = ref(versions[0])
  const user = reactive({ name: null, email: null, picture: null })

  const login = () => (isLoggedIn.value = true)
  const logout = () => (isLoggedIn.value = false)
  return { isLoggedIn, login, logout, user, version, versions }
})
