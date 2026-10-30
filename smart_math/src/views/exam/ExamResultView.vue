<script setup lang="ts">
import { useExamStore } from '@/stores/exam'
import { useAuthStore } from '@/stores/auth'
import { useHistoryStore } from '@/stores/history'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const examStore = useExamStore()
const authStore = useAuthStore()
const historyStore = useHistoryStore()

const router = useRouter()

onMounted(() => {
  const result = examStore.result
  const user = authStore.currentUser

  if (result === null || user === null || examStore.isResultRecorded) {
    return
  }

  const passed = result.result === 'pass'

  historyStore.addAttempt({
    user_id: user.id,
    level_id: result.level_id,
    score: result.score,
    result: passed ? 'pass' : 'fail',
  })

  if (passed) {
    authStore.fetchCurrentUser()
  }

  examStore.markResultRecorded()
})
</script>

<template>
  <div class="min-h-screen bg-zinc-900 px-6 py-10">
    <div class="max-w-xl mx-auto">
      <div
        v-if="examStore.result"
        class="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center"
      >
        <h1 class="text-2xl font-semibold text-white mb-6">Exam Result</h1>

        <div class="flex justify-center gap-10 mb-6">
          <div>
            <p class="text-slate-400 text-sm mb-1">Score</p>
            <p class="text-3xl font-bold text-white">{{ examStore.result.score }}%</p>
          </div>

          <div>
            <p class="text-slate-400 text-sm mb-1">Result</p>
            <p
              class="text-3xl font-bold"
              :class="examStore.result.result === 'pass' ? 'text-green-500' : 'text-red-500'"
            >
              {{ examStore.result.result === 'pass' ? 'Pass' : 'Fail' }}
            </p>
          </div>
        </div>

        <p v-if="examStore.completedAllLevels" class="text-blue-400 font-medium">
          You have reached max level!
        </p>
        <p
          v-else-if="examStore.result.result === 'pass' && authStore.currentUser"
          class="text-blue-400 font-medium"
        >
          You are now level {{ authStore.currentUser.level }}!
        </p>
      </div>

      <div v-else class="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <p class="text-slate-400">No result found. Please take the exam first.</p>
      </div>

      <div v-if="authStore.currentUser" class="flex justify-center gap-3 mt-6">
        <button
          @click="router.push({ name: 'user-profile', params: { id: authStore.currentUser.id } })"
          class="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-200 hover:border-slate-400"
        >
          Back to Profile
        </button>

        <button
          @click="router.push({ name: 'user-history', params: { id: authStore.currentUser.id } })"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Exam History
        </button>
      </div>
    </div>
  </div>
</template>
