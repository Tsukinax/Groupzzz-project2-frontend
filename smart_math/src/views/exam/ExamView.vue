<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'

const router = useRouter()
const examStore = useExamStore()

onMounted(async () => {
  try {
    await examStore.loadExam()
  } catch {
    router.push({ name: 'network-error-view' })
  }
})

const isSubmitting = ref(false)

async function handleSubmit() {
  if (!examStore.allAnswered || isSubmitting.value) return
  isSubmitting.value = true
  try {
    await examStore.submitExam()
    router.push({ name: 'exam-result' })
  } catch {
    router.push({ name: 'network-error-view' })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-zinc-900 px-6 py-10">
    <div v-if="examStore.currentQuestion" class="max-w-xl mx-auto">
      <h1 class="text-2xl font-semibold text-white mb-1">Level Exam</h1>
      <p class="text-slate-400 mb-6">
        Question {{ examStore.currentIndex + 1 }} of {{ examStore.totalQuestion }}
      </p>

      <div class="bg-slate-800 border border-slate-700 rounded-xl p-6 mb-6">
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

      <p
        v-if="examStore.isLastQuestion && !examStore.allAnswered"
        class="text-slate-400 text-sm mb-3"
      >
        Please answer all questions before submit.
      </p>

      <div class="flex justify-between">
        <button
          @click="examStore.previousQuestion()"
          :disabled="examStore.currentIndex === 0"
          class="px-5 py-2.5 rounded-lg bg-zinc-800 border border-slate-700 text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-700"
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
          :disabled="!examStore.allAnswered || isSubmitting"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-blue-600"
        >
          {{ isSubmitting ? 'Submitting...' : 'Submit' }}
        </button>
      </div>
    </div>

    <p v-else-if="examStore.isLoading" class="text-center text-slate-400">Loading exam...</p>
    <p v-else class="text-center text-slate-400">No exam questions found for your level.</p>
  </div>
</template>