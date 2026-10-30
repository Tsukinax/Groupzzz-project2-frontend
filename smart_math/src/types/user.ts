export type UserStatus = 'Active' | 'Inactive'

export type Role = 'ROLE_USER' | 'ROLE_ADMIN'

export interface User {
  id: number
  username: string
  name: string
  surname: string
  email: string
  province: string
  image: string
  status: UserStatus
  level: number
  levelName: string
  roles: Role[]
}

export interface LoginForm {
  username: string
  password: string
}

export interface RegisterForm {
  username: string
  password: string
  name: string
  surname: string
  email: string
  province: string
  image: string
}

export interface AuthResponse {
  token: string
  user: User
}
