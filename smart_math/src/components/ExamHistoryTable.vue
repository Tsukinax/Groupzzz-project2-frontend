<script setup lang="ts">
import type { ExamAttempt } from '@/types/history'
import type { LevelSummary } from '@/types/level'

const props = defineProps<{ attempts: ExamAttempt[]; badges?: LevelSummary[] }>()

function formatDateTime(value: string): string {
  return new Date(value).toLocaleString('en-GB', { dateStyle: 'medium', timeStyle: 'short' })
}
function newBadge(attempt: ExamAttempt): LevelSummary | undefined {
  if (!attempt.passed || !props.badges) return undefined
  return props.badges.find((b) => b.id > attempt.level.id)
}
</script>

<template>
  <div v-if="attempts.length > 0" class="overflow-x-auto rounded-xl border border-zinc-800">
    <table class="w-full min-w-[520px]">
      <thead class="bg-zinc-950">
        <tr>
          <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Date</th>
          <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Level</th>
          <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Score</th>
          <th class="px-4 py-3 text-left text-sm font-medium text-zinc-400">Result</th>
          <th v-if="badges" class="px-4 py-3 text-left text-sm font-medium text-zinc-400">
            New badge
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-zinc-800 bg-zinc-900/80">
        <tr v-for="attempt in attempts" :key="attempt.id">
          <td class="px-4 py-3 text-zinc-400">{{ formatDateTime(attempt.attemptedAt) }}</td>
          <td class="px-4 py-3 text-zinc-100">{{ attempt.level.name }}</td>
          <td class="px-4 py-3 text-zinc-100">{{ attempt.score }}%</td>
          <td class="px-4 py-3">
            <span
              class="rounded-full px-2.5 py-0.5 text-sm font-medium"
              :class="attempt.passed ? 'bg-green-950 text-green-400' : 'bg-red-950 text-red-400'"
            >
              {{ attempt.passed ? 'Pass' : 'Fail' }}
            </span>
          </td>
          <td v-if="badges" class="px-4 py-3">
            <span
              v-if="newBadge(attempt)"
              class="rounded-full bg-amber-500 px-2.5 py-0.5 text-sm font-bold text-zinc-950"
            >
              L{{ newBadge(attempt)!.id }}
            </span>
            <span v-else class="text-zinc-600">-</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p v-else class="text-zinc-500">No exam attempt yet.</p>
</template>