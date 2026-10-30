export interface Question {
  id: number
  question: string
  choices: string[]
  correctAnswer: string
  level: { id: number; name: string }
}

export interface NewQuestion {
  question: string
  choices: string[]
  correctAnswer: string
  levelId: number
}

export interface ExamQuestion {
  id: number
  question: string
  choices: string[]
}

export interface ExamSubmit {
  answers: Record<number, string>
}

export interface ExamResult {
  score: number
  passed: boolean
  passScore: number
  levelUpgraded: boolean
  currentLevelId: number
}
