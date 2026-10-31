<script setup lang="ts">
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuestionStore } from '@/stores/question'
import { useLevelStore } from '@/stores/level'
import { useMessageStore } from '@/stores/message'
import QuestionCard from '@/components/QuestionCard.vue'
import QuestionForm from '@/components/QuestionForm.vue'
import type { NewQuestion } from '@/types/exam'

const route = useRoute()
const router = useRouter()
const questionStore = useQuestionStore()
const levelStore = useLevelStore()
const messageStore = useMessageStore()

const isLoading = ref(false)
const editingId = ref<number | null>(null)
const level = ref((route.query.level as string) || '')

onMounted(async () => {
  isLoading.value = true
  try {
    if (!questionStore.isLoaded) {
      await questionStore.loadQuestions()
    }
    if (!levelStore.isLoaded) {
      await levelStore.loadData()
    }
  } catch {
    router.push({ name: 'network-error-view' })
  } finally {
    isLoading.value = false
  }
})

function showMessage(text: string) {
  messageStore.updateMessage(text)
  setTimeout(() => {
    messageStore.resetMessage()
  }, 3000)
}

function updateFilter() {
  const query: Record<string, string> = {}
  if (level.value) {
    query.level = level.value
  }
  router.push({ query })
}

const filteredQuestions = computed(() => {
  const levelId = route.query.level
  if (!levelId) {
    return questionStore.questions
  }
  return questionStore.getQuestionsByLevel(Number(levelId))
})

async function handleSubmit(payload: NewQuestion) {
  try {
    await questionStore.addQuestion(payload)
    showMessage('The question was added')
  } catch {
    showMessage('Could not add the question')
  }
}

async function handleUpdate(id: number, payload: NewQuestion) {
  try {
    await questionStore.updateQuestion(id, payload)
    editingId.value = null
    showMessage('The question was saved')
  } catch {
    showMessage('Could not save the question')
  }
}

async function handleDelete(id: number) {
  try {
    await questionStore.deleteQuestion(id)
    showMessage('The question was deleted')
  } catch {
    showMessage('Could not delete the question')
  }
}
</script>

<template>
  <div class="px-4 pt-3 sm:px-10">
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl text-white">Question</h1>
      <div class="text-zinc-400">Question: {{ filteredQuestions.length }}</div>
    </div>

    <select
      v-model="level"
      @change="updateFilter"
      class="mb-4 w-48 rounded-xl border border-zinc-700 bg-zinc-900 px-3 py-2 text-white hover:border-zinc-500"
    >
      <option value="">All Levels</option>
      <option v-for="lv in levelStore.levels" :key="lv.id" :value="String(lv.id)">
        {{ lv.name }}
      </option>
    </select>

    <QuestionForm :levels="levelStore.levels" @submit="handleSubmit" />

    <div class="space-y-1">
      <p v-if="isLoading" class="py-10 text-center text-zinc-500">Loading...</p>
      <p v-else-if="filteredQuestions.length === 0" class="py-10 text-center text-zinc-500">
        No questions
      </p>
      <template v-else>
        <template v-for="q in filteredQuestions" :key="q.id">
          <QuestionForm
            v-if="editingId === q.id"
            :levels="levelStore.levels"
            :question="q"
            @submit="handleUpdate(q.id, $event)"
            @cancel="editingId = null"
          />
          <QuestionCard
            v-else
            :question="q"
            class="mb-5"
            @edit="editingId = q.id"
            @delete="handleDelete(q.id)"
          />
        </template>
      </template>
    </div>
  </div>
</template>