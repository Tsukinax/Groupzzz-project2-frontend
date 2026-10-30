import apiClient from '@/services/AxiosClient'
import router from '@/router'
import { useAuthStore } from '@/stores/auth'

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const authStore = useAuthStore()
    if (error.response?.status === 401 && authStore.token) {
      authStore.clearSession()
      router.push({ name: 'login' })
    }
    return Promise.reject(error)
  },
)
