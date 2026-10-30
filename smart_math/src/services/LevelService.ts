import apiClient from '@/services/AxiosClient'
import type { Axios, AxiosResponse } from 'axios'
import type {Level, Benefit, Service, NewBenefit, NewService} from '@/types/level'

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

  addBenefit(levelId: number, benefit: NewBenefit): Promise<AxiosResponse<Benefit>> {
    return apiClient.post<Benefit>('/admin/levels/' + levelId + '/benefits', benefit)
  },
  updateBenefit(id: number, benefit: NewBenefit): Promise<AxiosResponse<Benefit>>{
    return apiClient.put<Benefit>('/admin/benefit'+id, benefit)
  },
  deleteBenefit(id: number): Promise<AxiosResponse<void>>{
    return apiClient.delete<void>('/admin/benefits'+id)
  },
  addService(levelId: number, service: NewService): Promise<AxiosResponse<Service>>{
    return apiClient.post<Service>('/admin/level/' + levelId+ '/services',service)
  },
  updateService(id: number, service: NewService): Promise<AxiosResponse<Service>>{
    return apiClient.put<Service>('/admin/services'+ id,service)
  },
  deleteService(id: number): Promise<AxiosResponse<void>>{
    return apiClient.delete<void>('/admin/services'+id)
  },
}
