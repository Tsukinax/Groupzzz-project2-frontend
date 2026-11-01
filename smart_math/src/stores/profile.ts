import { defineStore } from 'pinia'
import { ref } from 'vue'
import UserService from '@/services/UserService'
import type { Level } from '@/types/level'

export const useProfileStore = defineStore('profile', () => {
  const level = ref<Level | null>(null)

  async function loadLevel() {
    const response = await UserService.getLevel()
    level.value = response.data
  }

  return { level, loadLevel }
})
