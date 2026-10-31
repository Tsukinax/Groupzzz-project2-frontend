import { defineStore } from 'pinia'
import { ref } from 'vue'
import QuestionService from '@/services/QuestionService'
import type { Question, NewQuestion } from '@/types/exam'

export const useQuestionStore = defineStore('question', () => {
  const questions = ref<Question[]>([])
  const isLoaded = ref(false)

  async function loadQuestions() {
    const response = await QuestionService.getQuestions()
    questions.value = response.data
    isLoaded.value = true
  }
  function getQuestionsByLevel(levelId: number): Question[] {
    return questions.value.filter((q) => q.level.id === levelId)
  }
  async function addQuestion(payload: NewQuestion) {
    const response = await QuestionService.addQuestion(payload)
    questions.value.push(response.data)
  }
  async function updateQuestion(id: number, payload: NewQuestion) {
    const response = await QuestionService.updateQuestion(id, payload)
    const index = questions.value.findIndex((q) => q.id === id)
    if (index !== -1) questions.value[index] = response.data
  }
  async function deleteQuestion(id: number) {
    await QuestionService.deleteQuestion(id)
    questions.value = questions.value.filter((q) => q.id !== id)
  }

  return {
    questions,
    isLoaded,
    loadQuestions,
    getQuestionsByLevel,
    addQuestion,
    updateQuestion,
    deleteQuestion,
  }
})
