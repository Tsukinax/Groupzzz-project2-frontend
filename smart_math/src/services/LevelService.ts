import apiClient from '@/services/AxiosClient'
import type { Level } from '@/types/level'

export default {
  getLevels() {
    return apiClient.get<Level[]>('/admin/levels')
  },
  getLevel(id: number) {
    return apiClient.get<Level>('/admin/levels/' + id)
  },
  updateLevel(id: number, level: { name: string; description: string; passScore: number }) {
    return apiClient.put<Level>('/admin/levels/' + id, level)
  },
}
