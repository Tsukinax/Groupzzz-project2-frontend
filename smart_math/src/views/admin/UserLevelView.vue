<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ExamHistoryTable from '@/components/ExamHistoryTable.vue'
import ExamService from '@/services/ExamService'
import { useUserStore } from '@/stores/user'
import type { ExamAttempt } from '@/types/history'

const router = useRouter()
const userStore = useUserStore()
const examHistory = ref<ExamAttempt[]>([])

onMounted(async () => {
  const user = userStore.currentUser
  if (user === null) {
    return
  }
  try {
    const response = await ExamService.getUserHistory(user.id)
    examHistory.value = response.data
  } catch {
    router.push({ name: 'network-error-view' })
  }
})
</script>

<template>
  <div class="space-y-6">
    <div
      v-if="userStore.currentUser"
      class="flex flex-wrap items-center gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
    >
      <span class="text-zinc-400">Current Level</span>
      <span class="rounded-xl bg-blue-600 px-2.5 py-0.5 text-white">
        {{ userStore.currentUser.levelName }}
      </span>
      <span class="ml-auto text-zinc-400">Exam History: {{ examHistory.length }}</span>
    </div>

    <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
      <h2 class="mb-4 text-white">Exam History</h2>
      <ExamHistoryTable :attempts="examHistory" />
    </div>
  </div>
</template>