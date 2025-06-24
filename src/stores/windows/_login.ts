import { reactive, ref } from 'vue'

export function useWindowUser() {
  const isLoggedIn = ref(true)
  const user = reactive({ name: null, email: null, picture: null })
  const login = () => (isLoggedIn.value = true)
  const logout = () => (isLoggedIn.value = false)
  return {
    user,
    isLoggedIn,
    login,
    logout,
  }
}
