import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { RegisterForm, User } from '@/types/user'
import DataService from '@/services/DataService'

const START_LEVEL = 1

const MAX_LEVEL = 4

const PROFILE_IMAGE_1 = '/images/profile1.jpg'
const PROFILE_IMAGE_2 = '/images/profile2.jpg'

const ADMIN_USER: User = {
  id: 0,
  username: 'admin',
  name: 'Admin',
  surname: 'System',
  email: 'admin@example.com',
  province: '-',
  level: 4,
  status: 'Active',
  image: PROFILE_IMAGE_2,
  badges: [],
}

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref<User | null>(null)
  const registeredUsers = ref<User[]>([])

  const users = ref<User[]>([])
  const isLoaded = ref(false)

  async function loadUsers() {
    const response = await DataService.getData()
    users.value = response.data.users
    isLoaded.value = true
  }

  const isLoggedIn = computed(() => currentUser.value !== null)
  const isAdmin = computed(() => currentUser.value?.username === 'admin')
  const isUser = computed(() => isLoggedIn.value && !isAdmin.value)

  function isEmailTaken(email: string): boolean {
    return registeredUsers.value.some((u) => u.email.toLowerCase() === email.toLowerCase())
  }

  function register(form: RegisterForm): User {
    const isEvenTurn = registeredUsers.value.length % 2 === 0

    const user: User = {
      id: Date.now(), 
      username: form.email.split('@')[0] || form.email,
      name: form.name,
      surname: form.surname,
      email: form.email,
      province: form.province,
      level: START_LEVEL,
      status: 'Active',
      image: isEvenTurn ? PROFILE_IMAGE_1 : PROFILE_IMAGE_2,
      badges: [],
    }

    registeredUsers.value.push(user)
    currentUser.value = user
    return user
  }

  function login(username: string): User | null {
    if (username === ADMIN_USER.username) {
      currentUser.value = ADMIN_USER
      return currentUser.value
    }

    const fromDb = users.value.find((u) => u.username === username)
    const fromRegistered = registeredUsers.value.find(
      (u) => u.username === username || u.email === username,
    )

    currentUser.value = fromDb ?? fromRegistered ?? null
    return currentUser.value
  }

  function upgradeLevel(passedLevelId: number) {
    const user = currentUser.value
    if (user === null) {
      return
    }

    if (!user.badges.includes(passedLevelId)) {
      user.badges.push(passedLevelId)
    }

    const nextLevel = Math.min(passedLevelId + 1, MAX_LEVEL)
    if (nextLevel > user.level) {
      user.level = nextLevel
    }
  }

  function logout() {
    currentUser.value = null
  }

  return {
    currentUser,
    registeredUsers,
    users,
    isLoaded,
    loadUsers,
    isLoggedIn,
    isAdmin,
    isUser,
    isEmailTaken,
    register,
    login,
    upgradeLevel,
    logout,
  }
})
