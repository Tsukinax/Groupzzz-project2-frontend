<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import FeatureList from '@/components/FeatureList.vue'
import { useAuthStore } from '@/stores/auth'
import { useProfileStore } from '@/stores/profile'

const { currentUser } = storeToRefs(useAuthStore())
const { level } = storeToRefs(useProfileStore())

const benefits = computed(() => level.value?.benefits ?? [])
const services = computed(() =>
  (level.value?.services ?? []).map((service) => ({
    id: service.id,
    title: service.name,
    description: service.description,
  })),
)
</script>

<template>
  <div v-if="level && currentUser" class="space-y-8">
    <section
      class="rounded-2xl border border-blue-900/60 bg-gradient-to-br from-blue-950/70 to-zinc-900 p-6 sm:p-8"
    >
      <p class="text-sm text-blue-300">Welcome back, {{ currentUser.name }}</p>
      <div class="mt-4 flex items-center gap-4">
        <span
          class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xl font-bold text-white"
        >
          L{{ level.id }}
        </span>
        <div>
          <p class="text-sm text-zinc-400">Your current level</p>
          <h1 class="text-2xl font-bold text-white sm:text-3xl">{{ level.name }}</h1>
        </div>
      </div>
      <p class="mt-4 text-zinc-300">{{ level.description }}</p>

      <div class="mt-6 flex flex-col gap-3 sm:flex-row">
        <RouterLink
          :to="{ name: 'learning' }"
          class="rounded-lg border border-zinc-600 px-4 py-2 text-center text-sm font-medium text-zinc-200 transition hover:border-zinc-400"
        >
          Study this level
        </RouterLink>
        <RouterLink
          :to="{ name: 'exam' }"
          class="rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-medium text-white transition hover:bg-blue-500"
        >
          Take the exam (pass {{ level.passScore }}%)
        </RouterLink>
      </div>
    </section>

    <section>
      <h2 class="mb-3 text-lg font-semibold text-white">Your benefits</h2>
      <FeatureList :items="benefits" empty-text="There are no benefits for this level yet." />
    </section>

    <section>
      <h2 class="mb-3 text-lg font-semibold text-white">Available services</h2>
      <FeatureList :items="services" empty-text="There are no services for this level yet." />
    </section>
  </div>
  <p v-else class="text-zinc-500">Loading your level...</p>
</template>
