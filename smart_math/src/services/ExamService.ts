import apiClient from '@/services/AxiosClient'
import type { ExamQuestion, ExamSubmit, ExamResult } from '@/types/exam'
import type { ExamAttempt } from '@/types/history'
import type { ElearningContent } from '@/types/elearning'

export default {
  getExam() {
    return apiClient.get<ExamQuestion[]>('/user/exam')
  },
  submitExam(submit: ExamSubmit) {
    return apiClient.post<ExamResult>('/user/exam', submit)
  },
  getHistory() {
    return apiClient.get<ExamAttempt[]>('/user/exam-history')
  },
  getUserHistory(userId: number) {
    return apiClient.get<ExamAttempt[]>('/admin/users/' + userId + '/exam-history')
  },
  getElearning() {
    return apiClient.get<ElearningContent[]>('/user/elearning')
  },
}
