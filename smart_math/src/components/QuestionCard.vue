<script setup lang="ts">
import { ref } from 'vue'
import type { Question } from '@/types/exam'

defineProps<{ question: Question }>()
const emit = defineEmits<{ (e: 'edit'): void; (e: 'delete'): void }>()
const isConfirming = ref(false)
</script>

<template>
  <div class="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-white">
    <div class="mb-1 flex items-start justify-between gap-2">
      <div class="font-medium">{{ question.question }}</div>
      <span class="shrink-0 rounded-xl bg-zinc-800 px-2 py-0.5 text-xs text-zinc-300">{{
        question.level.name
      }}</span>
    </div>
    <div class="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
      <div
        v-for="(choice, index) in question.choices"
        :key="index"
        class="rounded-lg border px-3 py-1.5"
        :class="
          choice === question.correctAnswer
            ? 'border-green-500 text-green-400'
            : 'border-zinc-700 text-zinc-300'
        "
      >
        {{ choice }}
      </div>
    </div>
    <div class="mt-3 flex gap-2">
      <button
        type="button"
        class="rounded-xl bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
        @click="emit('edit')"
      >
        Edit
      </button>
      <button
        v-if="!isConfirming"
        type="button"
        class="rounded-xl bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"
        @click="isConfirming = true"
      >
        Delete
      </button>
      <template v-else>
        <button
          type="button"
          class="rounded-xl bg-red-600 px-3 py-1.5 text-sm hover:bg-red-500"
          @click="emit('delete')"
        >
          Confirm
        </button>
        <button
          type="button"
          class="rounded-xl bg-zinc-800 px-3 py-1.5 text-sm hover:bg-zinc-700"
          @click="isConfirming = false"
        >
          Keep
        </button>
      </template>
    </div>
  </div>
</template>
