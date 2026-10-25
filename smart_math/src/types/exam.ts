export interface Question extends NewQuestion {
  
  id: number
}

export interface ExamResult {
  id: number
  level_id: number
  user_id: number
  score: number
  result: string
}

export interface NewQuestion{
  level_id: number
  question: string
  choices: string[]
  correct_answer: string
}