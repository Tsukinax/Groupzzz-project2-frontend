import apiClient from '@/services/AxiosClient'
import type { AxiosResponse } from 'axios'
import type { User, UserUpdateForm } from '@/types/user'

export interface UserFilter {
  name: string
  level: string
  province: string
}

export default {
  getUsers(perPage: number, page: number, filter: UserFilter): Promise<AxiosResponse<User[]>> {
    let url = '/admin/users?_limit=' + perPage + '&_page=' + page
    url = url + '&name=' + filter.name + '&province=' + filter.province
    if (filter.level) {
      url = url + '&level=' + filter.level
    }
    return apiClient.get<User[]>(url)
  },
  getUser(id: number): Promise<AxiosResponse<User>> {
    return apiClient.get<User>('/admin/users/' + id)
  },
  updateUser(id: number, form: UserUpdateForm): Promise<AxiosResponse<User>> {
    return apiClient.put<User>('/admin/users/' + id, form)
  },
  updateStatus(id: number, active: boolean): Promise<AxiosResponse<User>> {
    return apiClient.patch<User>('/admin/users/' + id + '/status', { active: active })
  },
}
