import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Benefit, Level, Service } from '@/types/level'
import LevelService from '@/services/LevelService'

export const useLevelStore = defineStore('level', () => {
  const levels = ref<Level[]>([])
  const currentLevel = ref<Level | null>(null)
  const isLoaded = ref(false)

  function sortItems(level: Level): Level {
    level.benefits.sort((a, b) => a.id - b.id)
    level.services.sort((a, b) => a.id - b.id)
    return level
  }

  async function loadData() {
    const response = await LevelService.getLevels()
    levels.value = response.data.map(sortItems)
    isLoaded.value = true
  }

  function getLevelById(levelId: number): Level | undefined {
    return levels.value.find((level) => level.id === levelId)
  }

  function getBenefitsByLevel(levelId: number): Benefit[] {
    return getLevelById(levelId)?.benefits || []
  }

  function getServicesByLevel(levelId: number): Service[] {
    return getLevelById(levelId)?.services || []
  }

  function setCurrentLevel(level: Level) {
    currentLevel.value = sortItems(level)
    const index = levels.value.findIndex((l) => l.id === level.id)
    if (index !== -1) {
      levels.value[index] = level
    }
  }


  return {
    levels,
    currentLevel,
    isLoaded,
    loadData,
    getLevelById,
    getBenefitsByLevel,
    getServicesByLevel,
    setCurrentLevel,
  }
})
