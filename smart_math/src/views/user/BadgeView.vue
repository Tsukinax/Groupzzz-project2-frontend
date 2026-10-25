<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLevelStore } from '@/stores/level'

const authStore = useAuthStore()
const levelStore = useLevelStore()

const earnedBadges = computed(() => {
  const user = authStore.currentUser
  if (user === null) {
    return []
  }
  return user.badges.map((levelId) => ({
    levelId,
    level: levelStore.getLevelById(levelId),
  }))
})
</script>

<template>
  <div v-if="authStore.currentUser">
    <h1 class="mb-1 text-xl font-semibold text-white">Received Badges</h1>
    <p class="mb-5 text-sm text-zinc-500">Receive one badge each time you pass a level.</p>

    <div class="grid gap-3 sm:grid-cols-3">
      <article
        v-for="badge in earnedBadges"
        :key="badge.levelId"
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5 text-center"
      >
        <div
          class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white"
        >
          L{{ badge.levelId }}
        </div>
        <h2 class="mt-3 font-medium text-zinc-100">
          {{ badge.level ? badge.level.name : 'Level ' + badge.levelId }}
        </h2>
        <p class="mt-1 text-xs text-zinc-500">Passed the exam</p>
      </article>
    </div>

    <p v-if="earnedBadges.length === 0" class="text-zinc-500">
      No badge yet — Pass the first level to earn your first badge.
    </p>
  </div>
</template>
