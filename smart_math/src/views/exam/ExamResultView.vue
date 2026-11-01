<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'

const router = useRouter()
const examStore = useExamStore()
const authStore = useAuthStore()
const profileStore = useProfileStore()

onMounted(async () => {
  if (examStore.result?.levelUpgraded) {
    await authStore.fetchCurrentUser()
    await profileStore.loadLevel()
  }
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

        <div class="flex justify-center gap-10 mb-4">
          <div>
            <p class="text-slate-400 text-sm mb-1">Score</p>
            <p class="text-3xl font-bold text-white">{{ examStore.result.score }}%</p>
          </div>

          <div>
            <p class="text-slate-400 text-sm mb-1">Result</p>
            <p
              class="text-3xl font-bold"
              :class="examStore.result.passed ? 'text-green-500' : 'text-red-500'"
            >
              {{ examStore.result.passed ? 'Pass' : 'Fail' }}
            </p>
          </div>
        </div>

        <p class="text-slate-400 text-sm mb-4">Pass score: {{ examStore.result.passScore }}%</p>

        <p v-if="examStore.result.levelUpgraded" class="text-blue-400 font-medium">
          You are now level {{ examStore.result.currentLevelId }}!
        </p>
        <p v-else-if="examStore.result.passed" class="text-blue-400 font-medium">
          You have reached max level!
        </p>
        <p v-else class="text-slate-400">Review the lesson and try again.</p>
      </div>

      <div v-else class="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
        <p class="text-slate-400">No result found. Please take the exam first.</p>
      </div>

      <div class="flex flex-wrap justify-center gap-3 mt-6">
        <button
          @click="router.push({ name: 'user-home' })"
          class="px-5 py-2.5 rounded-lg border border-slate-600 text-slate-200 hover:border-slate-400"
        >
          Home
        </button>

        <button
          @click="router.push({ name: 'user-history' })"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Exam History
        </button>

        <button
          v-if="examStore.result && !examStore.result.passed"
          @click="router.push({ name: 'exam' })"
          class="px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>