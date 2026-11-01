export interface Level {
  id: number
  name: string
  description: string
  passScore: number
  benefits: Benefit[]
  services: Service[]
}

export interface LevelSummary {
  id: number
  name: string
}

export interface Benefit {
  id: number
  title: string
  description: string
}

export interface Service {
  id: number
  name: string
  description: string
}

export interface NewBenefit{
  title: string
  description: string
}

export interface NewService{
  name: string
  description: string
}
export interface ItemForm{
  name: string
  description: string
}
