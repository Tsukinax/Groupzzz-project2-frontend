import apiClient from '@/services/AxiosClient'
import type { Level, LevelSummary } from '@/types/level'
import type { User, UserUpdateForm } from '@/types/user'

export default {
  getMe() {
    return apiClient.get<User>('/user/me')
  },
  updateMe(form: UserUpdateForm) {
    return apiClient.put<User>('/user/me', form)
  },
  getLevel() {
    return apiClient.get<Level>('/user/me/level')
  },
  getBadges() {
    return apiClient.get<LevelSummary[]>('/user/me/badges')
  },
}
