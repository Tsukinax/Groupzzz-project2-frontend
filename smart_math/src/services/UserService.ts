import apiClient from '@/services/AxiosClient'
import type { User } from '@/types/user'

export default {
  getMe() {
    return apiClient.get<User>('/user/me')
  },
}
