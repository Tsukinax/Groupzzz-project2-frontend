import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Benefit, Level, Service } from '@/types/level'
import DataService from '@/services/DataService'

export const useLevelStore = defineStore('level', () => {
  const levels = ref<Level[]>([])
  const benefits = ref<Benefit[]>([])
  const services = ref<Service[]>([])
  const isLoaded = ref(false)

  async function loadData() {
    const response = await DataService.getData()
    levels.value = response.data.levels
    benefits.value = response.data.benefits
    services.value = response.data.services
    isLoaded.value = true
  }

  function getLevelById(levelId: number): Level | undefined {
    return levels.value.find((level) => level.id === levelId)
  }

  function getBenefitsByLevel(levelId: number): Benefit[] {
    return benefits.value.filter((benefit) => benefit.level_id === levelId)
  }

  function getServicesByLevel(levelId: number): Service[] {
    return services.value.filter((service) => service.level_id === levelId)
  }

  function updateLevel(updatedLevel: Level){
    const index=levels.value.findIndex((level)=>level.id === updatedLevel.id)
    if (index!== -1){
      levels.value[index]={...updatedLevel}
    }

  }

  return {
    levels,
    benefits,
    services,
    isLoaded,
    loadData,
    getLevelById,
    getBenefitsByLevel,
    getServicesByLevel,
    updateLevel,
  }
})
