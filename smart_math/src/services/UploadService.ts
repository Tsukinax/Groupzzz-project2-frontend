import apiClient from '@/services/AxiosClient'

export default {
  uploadImage(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    return apiClient.post<string>('/uploadImage', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
  },
}
