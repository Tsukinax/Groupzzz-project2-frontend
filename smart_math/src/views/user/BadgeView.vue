<script setup lang="ts">
import { onMounted, ref } from 'vue'
import UserService from '@/services/UserService'
import type { LevelSummary } from '@/types/level'

const badges = ref<LevelSummary[]>([])

onMounted(async () => {
  const response = await UserService.getBadges()
  badges.value = response.data
})
</script>

<template>
  <div>
    <h2 class="mb-1 text-xl font-semibold text-white">Badges</h2>
    <p class="mb-5 text-sm text-zinc-500">You earn a badge for every level you reach.</p>

    <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <article
        v-for="badge in badges"
        :key="badge.id"
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 text-center"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-xl font-bold text-zinc-950"
        >
          L{{ badge.id }}
        </div>
        <h3 class="mt-3 text-sm font-medium text-zinc-100">{{ badge.name }}</h3>
      </article>
    </div>
  </div>
</template>
