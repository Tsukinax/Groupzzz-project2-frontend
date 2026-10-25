<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useHistoryStore } from '@/stores/history'
import { useLevelStore } from '@/stores/level'

const authStore = useAuthStore()
const historyStore = useHistoryStore()
const levelStore = useLevelStore()

onMounted(() => {
  if (!historyStore.isLoaded) {
    historyStore.loadHistory()
  }
})

const attempts = computed(() => {
  const user = authStore.currentUser
  return user === null ? [] : historyStore.getAttemptsByUser(user.id)
})

function levelName(levelId: number): string {
  const level = levelStore.getLevelById(levelId)
  return level ? level.name : 'Level ' + levelId
}

function formatDateTime(value: string): string {
  const [datePart, timePart] = value.split('T')
  if (!datePart || !timePart) {
    return value
  }
  const [year, month, day] = datePart.split('-')
  return `${day}/${month}/${year} ${timePart.slice(0, 5)} น.`
}
</script>

<template>
  <div v-if="authStore.currentUser">
    <h1 class="mb-1 text-xl font-semibold text-white">Exam History</h1>
    <p class="mb-5 text-sm text-zinc-500">Total {{ attempts.length }} attempts</p>

    <div class="overflow-x-auto rounded-xl border border-zinc-800">
      <table class="w-full min-w-[520px]">
        <thead class="bg-zinc-950">
          <tr>
            <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Level</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Score</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Result</th>
            <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Date</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-zinc-800 bg-zinc-900/80">
          <tr v-for="attempt in attempts" :key="attempt.id">
            <td class="px-4 py-3 text-zinc-100">{{ levelName(attempt.level_id) }}</td>
            <td class="px-4 py-3 text-zinc-100">{{ attempt.score }}%</td>
            <td
              class="px-4 py-3 font-medium"
              :class="attempt.result === 'pass' ? 'text-green-400' : 'text-red-400'"
            >
              {{ attempt.result === 'pass' ? 'Pass' : 'Fail' }}
            </td>
            <td class="px-4 py-3 text-zinc-400">{{ formatDateTime(attempt.taken_at) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="attempts.length === 0" class="mt-4 text-zinc-500">No exam attempt yet.</p>
  </div>
</template>
