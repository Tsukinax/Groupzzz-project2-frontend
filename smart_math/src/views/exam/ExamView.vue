<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import { useAuthStore } from '@/stores/auth'
import { useLevelStore } from '@/stores/level'

const route = useRoute()
const router = useRouter()
const examStore = useExamStore()
const authStore = useAuthStore()
const levelStore = useLevelStore()

const levelId = Number(route.params.levelId)

const FALLBACK_PASS_SCORE = 60

onMounted(async () => {
  if (!levelStore.isLoaded) {
    await levelStore.loadData()
  }
  examStore.loadQuestion(levelId)
})

const allAnswered = computed(
  () =>
    examStore.questions.length > 0 &&
    examStore.questions.every((q) => examStore.userAnswers[q.id] !== undefined),
)

function handleSubmit() {
  if (!allAnswered.value) {
    return
  }

  const user = authStore.currentUser
  if (user === null) {
    router.push({ name: 'login' })
    return
  }

  const level = levelStore.getLevelById(levelId)
  const passScore = level ? level.pass_score : FALLBACK_PASS_SCORE

  examStore.submitExam(user.id, levelId, passScore)

  router.push({ name: 'exam-result' })
}
</script>

<template>
  <div v-if="examStore.currentQuestion" class="min-h-screen bg-zinc-900 px-6 py-10">
    <div class="max-w-xl mx-auto">
      <h1 class="text-2xl font-semibold text-white mb-1">Exam - Level {{ levelId }}</h1>
      <p class="text-slate-400 mb-6">
        Question {{ examStore.currentIndex + 1 }} of {{ examStore.totalQuestion }}
      </p>

      <div class="bg-slate-800 border-slate-700 rounded-xl p-6 mb-6">
        <h2 class="text-lg text-white mb-5">
          {{ examStore.currentQuestion.question }}
        </h2>

        <div class="flex flex-col gap-2">
          <div
            v-for="choice in examStore.currentQuestion.choices"
            :key="choice"
            @click="examStore.selectAnswer(examStore.currentQuestion.id, choice)"
            :class="[
              'px-4 py-3 rounded-lg border cursor-pointer transition-colors',
              examStore.userAnswers[examStore.currentQuestion.id] === choice
                ? 'bg-blue-600 border-blue-600 text-white'
                : 'bg-slate-900 border-slate-700 text-slate-200 hover:bg-slate-700',
            ]"
          >
            {{ choice }}
          </div>
        </div>
      </div>

      <p v-if="examStore.isLastQuestion && !allAnswered" class="text-slate-400 text-sm mb-3">
        Please answer all questions before submit.
      </p>

      <div class="flex justify-between">
        <button
          @click="examStore.previousQuestion()"
          :disabled="examStore.currentIndex === 0"
          class="px-5 py-2.5 rounded-lg bg-zinc-800 border-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
        >
          Previous
        </button>

        <button
          v-if="!examStore.isLastQuestion"
          @click="examStore.nextQuestion()"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          Next
        </button>

        <button
          v-else
          @click="handleSubmit"
          :disabled="!allAnswered"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>
