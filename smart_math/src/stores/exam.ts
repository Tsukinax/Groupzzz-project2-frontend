import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import ExamService from '@/services/ExamService'
import type { ExamQuestion, ExamResult } from '@/types/exam'

export const useExamStore = defineStore('exam', () => {
  const questions = ref<ExamQuestion[]>([])
  const currentIndex = ref(0)
  const userAnswers = ref<Record<number, string>>({})
  const result = ref<ExamResult | null>(null)
  const isLoading = ref(false)

  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const totalQuestion = computed(() => questions.value.length)
  const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)
  const allAnswered = computed(
    () =>
      questions.value.length > 0 &&
      questions.value.every((q) => userAnswers.value[q.id] !== undefined),
  )

  async function loadExam() {
    isLoading.value = true
    try {
      const response = await ExamService.getExam()
      questions.value = response.data
      currentIndex.value = 0
      userAnswers.value = {}
      result.value = null
    } finally {
      isLoading.value = false
    }
  }

  function selectAnswer(questionId: number, choice: string) {
    userAnswers.value[questionId] = choice
  }

  function nextQuestion() {
    if (!isLastQuestion.value) currentIndex.value++
  }

  function previousQuestion() {
    if (currentIndex.value > 0) currentIndex.value--
  }

  async function submitExam() {
    const response = await ExamService.submitExam({ answers: userAnswers.value })
    result.value = response.data
    return response.data
  }

  function reset() {
    questions.value = []
    currentIndex.value = 0
    userAnswers.value = {}
    result.value = null
  }

  return {
    questions,
    currentIndex,
    userAnswers,
    result,
    isLoading,
    currentQuestion,
    totalQuestion,
    isLastQuestion,
    allAnswered,
    loadExam,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitExam,
    reset,
  }
})
