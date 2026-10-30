<script setup lang="ts">
import { ref } from 'vue'
import type { NewQuestion } from '@/types/exam'
import type { Level } from '@/types/level'

defineProps<{
  levels: Level[]
}>()
const emit = defineEmits<{
  (e: 'submit', payload: NewQuestion): void
}>()

const levelId = ref('')
const questionText = ref('')
const choices = ref(['', '', '', ''])
const correctAnswer = ref('')
const errorText = ref('')

function submitForm() {
  if (!levelId.value) {
    return (errorText.value = 'please select level')
  }
  if (!questionText.value) {
    return (errorText.value = 'please fill question')
  }
  if (choices.value.some((c) => !c)) {
    return (errorText.value = 'please fill all choice')
  }
  if (!correctAnswer.value) {
    return (errorText.value = 'please choose correct answer')
  }
  emit('submit', {
    levelId: Number(levelId.value),
    question: questionText.value,
    choices: [...choices.value],
    correctAnswer: correctAnswer.value,
  })
  levelId.value = ''
  questionText.value = ''
  choices.value = ['', '', '', '']
  correctAnswer.value = ''
  errorText.value = ''
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="flex flex-col gap-4 w-full bg-zinc-100 p-6 mb-5 rounded-xl border border-gray-200"
  >
    <h2 class="text-lg text-gray-800 border-b border-gray-200 pb-3">Add New Question</h2>
    <div class="flex flex-col gap-1">
      <span class="text-zinc-700 font-medium">Level</span>
      <select
        class="w-full border border-zinc-400 rounded-xl px-3 py-2 text-zinc-800 outline-none"
        v-model="levelId"
      >
        <option disabled value="">Select Level</option>
        <option v-for="lv in levels" :key="lv.id" :value="lv.id">{{ lv.name }}</option>
      </select>
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-zinc-700 font-medium">Question</span>
      <input
        class="w-full border border-zinc-400 rounded-xl px-3 py-2 text-zinc-800 outline-none"
        v-model="questionText"
        placeholder="Fill Question"
      />
    </div>
    <div>
      <span class="text-zinc-700 font-medium">Fill Choice of Question</span>
      <input
        class="w-full border border-zinc-400 rounded-xl px-3 py-2 mb-3 text-zinc-800 outline-none"
        v-for="(choice, index) in choices"
        :key="index"
        v-model="choices[index]"
      />
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-zinc-700 font-medium">Correct Answer</span>
      <select
        class="w-full border border-zinc-400 rounded-xl px-3 py-2 text-zinc-800 outline-none"
        v-model="correctAnswer"
      >
        <option disabled value="">select answer</option>
        <option v-for="choice in choices" :key="choice" :value="choice">{{ choice }}</option>
      </select>
    </div>

    <p v-if="errorText" class="text-red-600 bg-red-200 px-3 py-2 font-medium rounded-xl">
      {{ errorText }}
    </p>
    <button
      class="w-full border border-zinc-400 rounded-xl px-3 py-2 text-zinc-800 hover:bg-blue-500 hover:text-white"
      type="submit"
    >
      Add Question
    </button>
  </form>
</template>
