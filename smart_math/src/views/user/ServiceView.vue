<script setup lang="ts">
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useLevelStore } from '@/stores/level'

const authStore = useAuthStore()
const levelStore = useLevelStore()

const services = computed(() => {
  const user = authStore.currentUser
  return user === null ? [] : levelStore.getServicesByLevel(user.level)
})
</script>

<template>
  <div v-if="authStore.currentUser">
    <h1 class="mb-1 text-xl font-semibold text-white">Available Services</h1>
    <p class="mb-5 text-sm text-zinc-500">
      Match to the level {{ authStore.currentUser.level }} yours — Pass the test to unlock more.
    </p>

    <div class="grid gap-3 sm:grid-cols-2">
      <article
        v-for="service in services"
        :key="service.id"
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
      >
        <h2 class="font-medium text-zinc-100">{{ service.name }}</h2>
        <p class="mt-1 text-sm text-zinc-400">{{ service.description }}</p>
      </article>
    </div>

    <p v-if="services.length === 0" class="text-zinc-500">There is no service information available for this level yet.</p>
  </div>
</template>
