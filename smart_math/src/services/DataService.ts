import axios from 'axios'
import type { AxiosResponse } from 'axios'
import type { DbData } from '@/types/db'

const apiClient = axios.create({
  baseURL: '/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getData(): Promise<AxiosResponse<DbData>> {
    return apiClient.get('/db.json')
  },
}
