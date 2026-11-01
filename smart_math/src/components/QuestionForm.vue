<script setup lang="ts">
import { computed } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import ErrorMessage from '@/components/ErrorMessage.vue'
import InputText from '@/components/InputText.vue'
import type { NewQuestion, Question } from '@/types/exam'
import type { Level } from '@/types/level'

const props = defineProps<{ levels: Level[]; question?: Question }>()
const emit = defineEmits<{
  (e: 'submit', payload: NewQuestion): void
  (e: 'cancel'): void
}>()
const isEdit = computed(() => props.question !== undefined)

const validationSchema = yup.object({
  levelId: yup.string().required('Please select a level'),
  questionText: yup.string().required('The question is required'),
  choices: yup
    .array()
    .of(yup.string())
    .test(
      'all-filled',
      'Please fill all 4 choices',
      (list) => !!list && list.length === 4 && list.every((c) => !!c && c.trim() !== ''),
    )
    .test(
      'unique',
      'Choices must be different',
      (list) => !!list && new Set(list).size === list.length,
    ),
  correctIndex: yup.string().required('Please choose the correct answer'),
})

const q = props.question
const { errors, handleSubmit, resetForm } = useForm({
  validationSchema,
  initialValues: {
    levelId: q ? String(q.level.id) : '',
    questionText: q?.question ?? '',
    choices: q ? [...q.choices] : ['', '', '', ''],
    correctIndex: q ? String(q.choices.indexOf(q.correctAnswer)) : '',
  },
})
const { value: levelId } = useField<string>('levelId')
const { value: questionText } = useField<string>('questionText')
const { value: choices } = useField<string[]>('choices')
const { value: correctIndex } = useField<string>('correctIndex')

function setChoice(index: number, text: string) {
  choices.value = choices.value.map((c, i) => (i === index ? text : c))
}

const onSubmit = handleSubmit((values) => {
  const list = (values.choices ?? []) as string[]
  emit('submit', {
    levelId: Number(values.levelId),
    question: values.questionText ?? '',
    choices: list,
    correctAnswer: list[Number(values.correctIndex)] ?? '',
  })
  if (!isEdit.value) resetForm()
})
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="mb-5 space-y-4 rounded-xl border border-zinc-800 bg-zinc-900 p-6"
  >
    <h2 class="text-lg text-white">{{ isEdit ? 'Edit Question' : 'Add New Question' }}</h2>

    <div class="flex flex-col gap-1">
      <span class="text-zinc-400">Level</span>
      <select
        v-model="levelId"
        class="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
      >
        <option disabled value="">Select Level</option>
        <option v-for="lv in levels" :key="lv.id" :value="String(lv.id)">{{ lv.name }}</option>
      </select>
      <ErrorMessage v-if="errors['levelId']" class="text-sm text-red-400">{{
        errors['levelId']
      }}</ErrorMessage>
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-zinc-400">Question</span>
      <InputText id="question-text" v-model="questionText" :error="errors['questionText']" />
    </div>

    <div class="flex flex-col gap-2">
      <span class="text-zinc-400">Choices</span>
      <InputText
        v-for="(choice, index) in choices"
        :id="'choice-' + index"
        :key="index"
        :model-value="choice"
        :placeholder="'Choice ' + (index + 1)"
        @update:model-value="setChoice(index, $event)"
      />
      <ErrorMessage v-if="errors['choices']" class="text-sm text-red-400">{{
        errors['choices']
      }}</ErrorMessage>
    </div>

    <div class="flex flex-col gap-1">
      <span class="text-zinc-400">Correct Answer</span>
      <select
        v-model="correctIndex"
        class="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-white"
      >
        <option disabled value="">Select answer</option>
        <option v-for="(choice, index) in choices" :key="index" :value="String(index)">
          {{ choice || 'Choice ' + (index + 1) }}
        </option>
      </select>
      <ErrorMessage v-if="errors['correctIndex']" class="text-sm text-red-400">{{
        errors['correctIndex']
      }}</ErrorMessage>
    </div>

    <div class="flex gap-3">
      <button
        type="submit"
        class="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-500"
      >
        {{ isEdit ? 'Save' : 'Add Question' }}
      </button>
      <button
        v-if="isEdit"
        type="button"
        class="rounded-xl bg-zinc-800 px-5 py-2 text-white hover:bg-zinc-700"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
