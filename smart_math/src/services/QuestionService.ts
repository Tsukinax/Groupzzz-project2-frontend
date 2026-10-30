import apiClient from '@/services/AxiosClient'
import type { Question, NewQuestion } from '@/types/exam'

export default {
  getQuestions(levelId?: number) {
    return apiClient.get<Question[]>('/admin/questions', {
      params: levelId ? { level: levelId } : {},
    })
  },
  addQuestion(question: NewQuestion) {
    return apiClient.post<Question>('/admin/questions', question)
  },
  updateQuestion(id: number, question: NewQuestion) {
    return apiClient.put<Question>('/admin/questions/' + id, question)
  },
  deleteQuestion(id: number) {
    return apiClient.delete('/admin/questions/' + id)
  },
}
