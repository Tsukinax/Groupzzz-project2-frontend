<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@/stores/auth'

const { currentUser } = storeToRefs(useAuthStore())

const tabs = [
  { name: 'user-profile', label: 'Details' },
  { name: 'user-history', label: 'Exam History' },
  { name: 'user-badges', label: 'Badges' },
  { name: 'user-services', label: 'Services' },
]
</script>

<template>
  <div v-if="currentUser" class="space-y-6">
    <section
      class="flex flex-col items-center gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-6 text-center sm:flex-row sm:text-left"
    >
      <img
        :src="currentUser.image"
        :alt="currentUser.name"
        class="h-24 w-24 rounded-full border-2 border-blue-500 object-cover"
      />
      <div class="flex-1">
        <h1 class="text-2xl font-bold text-white">{{ currentUser.name }} {{ currentUser.surname }}</h1>
        <p class="text-zinc-400">@{{ currentUser.username }}</p>
        <span class="mt-2 inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white">
          {{ currentUser.levelName }}
        </span>
      </div>
      <RouterLink
        :to="{ name: 'user-profile-edit' }"
        class="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
      >
        Edit profile
      </RouterLink>
    </section>

    <nav class="flex gap-1 overflow-x-auto border-b border-zinc-800">
      <RouterLink
        v-for="tab in tabs"
        :key="tab.name"
        :to="{ name: tab.name }"
        class="border-b-2 border-transparent px-3 py-2 text-sm whitespace-nowrap text-zinc-400 transition hover:text-zinc-200"
        exact-active-class="border-blue-500 text-white"
      >
        {{ tab.label }}
      </RouterLink>
    </nav>

    <RouterView />
  </div>
</template>
