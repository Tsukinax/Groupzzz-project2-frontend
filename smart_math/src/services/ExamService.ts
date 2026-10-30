import apiClient from '@/services/AxiosClient'
import type { ExamQuestion, ExamSubmit, ExamResult } from '@/types/exam'
import type { ExamAttempt } from '@/types/history'
import type { ElearningContent } from '@/types/elearning'

// Marked: replace userId with the logged-in user from the auth store change later when it is ready na ja
export default {
  getExam(userId: number) {
    return apiClient.get<ExamQuestion[]>(`/user/${userId}/exam`)
  },
  submitExam(userId: number, submit: ExamSubmit) {
    return apiClient.post<ExamResult>(`/user/${userId}/exam`, submit)
  },
  getHistory(userId: number) {
    return apiClient.get<ExamAttempt[]>(`/user/${userId}/exam-history`)
  },
  getElearning(userId: number) {
    return apiClient.get<ElearningContent[]>(`/user/${userId}/elearning`)
  },
}
