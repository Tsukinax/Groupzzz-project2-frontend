import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Question, ExamResult } from '@/types/exam'
import { mockQuestions } from '@/mocks/questions'

export const useExamStore = defineStore('exam', () => {
  const questions = ref<Question[]>([])
  const currentIndex = ref(0)
  const userAnswers = ref<Record<number, string>>({})
  const result = ref<ExamResult | null>(null)

  const isResultRecorded = ref(false)

  const currentQuestion = computed(() => questions.value[currentIndex.value])
  const totalQuestion = computed(() => questions.value.length)
  const isLastQuestion = computed(() => currentIndex.value === questions.value.length - 1)

  function randomQuestion(levelId: number): Question[] {
    const questionForThisLevel = mockQuestions.filter((q) => q.level_id === levelId)

    const shuffled = [...questionForThisLevel]

    for (let i = 0; i < shuffled.length; i++) {
      const randomIndex = Math.floor(Math.random() * shuffled.length)
      const temp = shuffled[i]!
      shuffled[i] = shuffled[randomIndex]!
      shuffled[randomIndex] = temp
    }
    return shuffled
  }

  function loadQuestion(levelId: number) {
    questions.value = randomQuestion(levelId)
    currentIndex.value = 0
    userAnswers.value = {}
    result.value = null
    isResultRecorded.value = false
  }

  function selectAnswer(questionId: number, choice: string) {
    userAnswers.value[questionId] = choice
  }

  function nextQuestion() {
    if (!isLastQuestion.value) {
      currentIndex.value++
    }
  }

  function previousQuestion() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function submitExam(userId: number, levelId: number, passScore: number): ExamResult {
    isResultRecorded.value = false
    let correctCount = 0

    for (const q of questions.value) {
      if (userAnswers.value[q.id] === q.correct_answer) {
        correctCount++
      }
    }

    const score = Math.round((correctCount / questions.value.length) * 100)
    const passed = score >= passScore

    const sumResult: ExamResult = {
      id: Date.now(), // Marked
      user_id: userId,
      level_id: levelId,
      score,
      result: passed ? 'pass' : 'fail',
    }

    result.value = sumResult
    return sumResult
  }

  function markResultRecorded() {
    isResultRecorded.value = true
  }

  const Max_Level = 4

  const completedAllLevels = computed(
    () => result.value?.result === 'pass' && result.value.level_id === Max_Level,
  )

  return {
    questions,
    currentIndex,
    userAnswers,
    result,
    isResultRecorded,
    markResultRecorded,
    currentQuestion,
    totalQuestion,
    isLastQuestion,
    randomQuestion,
    loadQuestion,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitExam,
    completedAllLevels,
  }
})
