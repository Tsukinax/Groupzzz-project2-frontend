export interface Level {
  id: number
  name: string
  pass_score: number
  description: string
}

export interface Benefit {
  id: number
  level_id: number
  title: string
  description: string
}

export interface Service {
  id: number
  level_id: number
  name: string
  description: string
}
