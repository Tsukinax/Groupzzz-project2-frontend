import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import AuthService from '@/services/AuthService'
import UserService from '@/services/UserService'
import type { AuthResponse, LoginForm, RegisterForm, User } from '@/types/user'

const TOKEN_KEY = 'access_token'
const USER_KEY = 'user'

function loadStoredUser(): User | null {
  const stored = localStorage.getItem(USER_KEY)
  return stored ? (JSON.parse(stored) as User) : null
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(TOKEN_KEY))
  const currentUser = ref<User | null>(loadStoredUser())

  const isLoggedIn = computed(() => token.value !== null && currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.roles.includes('ROLE_ADMIN') ?? false)
  const homeRoute = computed(() =>
    isAdmin.value
      ? { name: 'admin-users' }
      : { name: 'user-profile', params: { id: currentUser.value?.id } },
  )

  async function login(form: LoginForm) {
    const response = await AuthService.login(form)
    saveSession(response.data)
  }

  async function register(form: RegisterForm) {
    const response = await AuthService.register(form)
    saveSession(response.data)
  }

  async function fetchCurrentUser() {
    const response = await UserService.getMe()
    setCurrentUser(response.data)
  }

  async function logout() {
    await AuthService.logout().catch(() => undefined)
    clearSession()
  }

  function setCurrentUser(user: User) {
    currentUser.value = user
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  function saveSession(auth: AuthResponse) {
    token.value = auth.token
    localStorage.setItem(TOKEN_KEY, auth.token)
    setCurrentUser(auth.user)
  }

  function clearSession() {
    token.value = null
    currentUser.value = null
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  }

  return {
    token,
    currentUser,
    isLoggedIn,
    isAdmin,
    homeRoute,
    login,
    register,
    fetchCurrentUser,
    logout,
    setCurrentUser,
    clearSession,
  }
})
