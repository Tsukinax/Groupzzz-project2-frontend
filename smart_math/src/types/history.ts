export interface ExamAttempt {
  id: number
  score: number
  passed: boolean
  attemptedAt: string
  level: { id: number; name: string }
}
