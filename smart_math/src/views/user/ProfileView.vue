<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLevelStore } from '@/stores/level'

const authStore = useAuthStore()
const levelStore = useLevelStore()

const currentLevel = computed(() => {
  const user = authStore.currentUser
  return user === null ? null : levelStore.getLevelById(user.level)
})

const benefits = computed(() => {
  const user = authStore.currentUser
  return user === null ? [] : levelStore.getBenefitsByLevel(user.level)
})

const services = computed(() => {
  const user = authStore.currentUser
  return user === null ? [] : levelStore.getServicesByLevel(user.level)
})
</script>

<template>
  <div v-if="authStore.currentUser" class="space-y-6">
    <section class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6">
      <p class="text-sm text-zinc-500">Current Level</p>
      <h1 class="mt-1 text-2xl font-bold text-blue-400">
        {{ currentLevel ? currentLevel.name : 'Level ' + authStore.currentUser.level }}
      </h1>
      <p v-if="currentLevel" class="mt-2 text-zinc-400">{{ currentLevel.description }}</p>
      <p v-if="currentLevel" class="mt-3 text-sm text-zinc-500">
        Passing criteria for this level: {{ currentLevel.pass_score }}%
      </p>
    </section>

    <section>
      <h2 class="mb-3 text-lg font-semibold text-white">Benefits</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <article
          v-for="benefit in benefits"
          :key="benefit.id"
          class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
        >
          <h3 class="font-medium text-zinc-100">{{ benefit.title }}</h3>
          <p class="mt-1 text-sm text-zinc-400">{{ benefit.description }}</p>
        </article>
      </div>
      <p v-if="benefits.length === 0" class="text-zinc-500">There is no benefit information for this level yet.</p>
    </section>

    <section>
      <h2 class="mb-3 text-lg font-semibold text-white">Services</h2>
      <div class="grid gap-3 sm:grid-cols-2">
        <article
          v-for="service in services"
          :key="service.id"
          class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
        >
          <h3 class="font-medium text-zinc-100">{{ service.name }}</h3>
          <p class="mt-1 text-sm text-zinc-400">{{ service.description }}</p>
        </article>
      </div>
      <p v-if="services.length === 0" class="text-zinc-500">There is no service information for this level yet.</p>
    </section>
  </div>
</template>
