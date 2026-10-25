export type UserStatus = 'Active' | 'Inactive'

export interface User {
  id: number
  username: string
  name: string
  surname: string
  email: string
  province: string
  level: number
  status: UserStatus
  image: string
  badges: number[]
}

export interface RegisterForm {
  name: string
  surname: string
  email: string
  password: string
  province: string
}
