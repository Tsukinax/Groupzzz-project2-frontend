<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ExamHistoryTable from '@/components/ExamHistoryTable.vue'
import ExamService from '@/services/ExamService'
import UserService from '@/services/UserService'
import type { ExamAttempt } from '@/types/history'
import type { LevelSummary } from '@/types/level'

const router = useRouter()
const attempts = ref<ExamAttempt[]>([])
const badges = ref<LevelSummary[]>([])

onMounted(async () => {
  try {
    const [history, badgeList] = await Promise.all([
      ExamService.getHistory(),
      UserService.getBadges(),
    ])
    attempts.value = history.data
    badges.value = badgeList.data
  } catch {
    router.push({ name: 'network-error-view' })
  }
})
</script>

<template>
  <div>
    <h2 class="mb-1 text-xl font-semibold text-white">Exam History</h2>
    <p class="mb-5 text-sm text-zinc-500">Total {{ attempts.length }} attempts</p>
    <ExamHistoryTable :attempts="attempts" :badges="badges" />
  </div>
</template>
