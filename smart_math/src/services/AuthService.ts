import apiClient from '@/services/AxiosClient'
import type { AuthResponse, LoginForm, RegisterForm } from '@/types/user'

export default {
  login(form: LoginForm) {
    return apiClient.post<AuthResponse>('/auth/authenticate', form)
  },
  register(form: RegisterForm) {
    return apiClient.post<AuthResponse>('/auth/register', form)
  },
  logout() {
    return apiClient.post('/auth/logout')
  },
}
