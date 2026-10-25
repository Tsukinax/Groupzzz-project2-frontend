export interface ExamAttempt {
  id: number
  user_id: number
  level_id: number
  score: number
  result: 'pass' | 'fail'
  taken_at: string
}
