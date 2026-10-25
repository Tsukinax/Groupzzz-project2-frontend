import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ExamAttempt } from '@/types/history'
import DataService from '@/services/DataService'

export const useHistoryStore = defineStore('history', () => {
  const attempts = ref<ExamAttempt[]>([])
  const isLoaded = ref(false)

  async function loadHistory() {
    if (isLoaded.value) {
      return
    }

    const response = await DataService.getData()
    const seeded: ExamAttempt[] = response.data.examHistory

    const seededIds = new Set(seeded.map((attempt) => attempt.id))
    const fromSession = attempts.value.filter((attempt) => !seededIds.has(attempt.id))

    attempts.value = [...seeded, ...fromSession]
    isLoaded.value = true
  }

  function addAttempt(input: {
    user_id: number
    level_id: number
    score: number
    result: 'pass' | 'fail'
  }): ExamAttempt {
    const attempt: ExamAttempt = {
      id: Date.now(),
      user_id: input.user_id,
      level_id: input.level_id,
      score: input.score,
      result: input.result,
      taken_at: new Date().toISOString(),
    }

    attempts.value.push(attempt)
    return attempt
  }

  function getAttemptsByUser(userId: number): ExamAttempt[] {
    return attempts.value
      .filter((attempt) => attempt.user_id === userId)
      .sort((a, b) => b.taken_at.localeCompare(a.taken_at))
  }

  return { attempts, isLoaded, loadHistory, addAttempt, getAttemptsByUser }
})
