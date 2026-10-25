<script setup lang="ts">
import { onMounted } from 'vue'
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useLevelStore } from '@/stores/level'
import ProfileMenu from '@/components/ProfileMenu.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const levelStore = useLevelStore()

onMounted(() => {
  if (!levelStore.isLoaded) {
    levelStore.loadData()
  }
})

const tabs = [
  { name: 'user-profile', label: 'overview' },
  { name: 'user-services', label: 'services' },
  { name: 'user-badges', label: 'badges' },
  { name: 'user-history', label: 'history' },
]

const userId = computed(() => route.params.id)

function handleLogout() {
  authStore.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <div class="min-h-screen bg-zinc-900">
    <header class="border-b border-zinc-800 bg-zinc-950">
      <div class="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <span class="font-bold text-white">Smart Math Passport</span>

        <ProfileMenu
          v-if="authStore.currentUser"
          :user="authStore.currentUser"
          @logout="handleLogout"
        />
      </div>
    </header>

    <nav class="border-b border-zinc-800 bg-zinc-950">
      <div class="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
        <RouterLink
          v-for="tab in tabs"
          :key="tab.name"
          :to="{ name: tab.name, params: { id: userId } }"
          class="border-b-2 border-transparent px-3 py-3 text-sm whitespace-nowrap text-zinc-400 transition hover:text-zinc-200"
          active-class="border-blue-500 text-white"
        >
          {{ tab.label }}
        </RouterLink>

        <RouterLink
          v-if="authStore.currentUser"
          :to="{ name: 'learning', params: { levelId: authStore.currentUser.level } }"
          class="ml-auto border-b-2 border-transparent px-3 py-3 text-sm whitespace-nowrap text-zinc-300 transition hover:text-white"
        >
          E-Learning
        </RouterLink>

        <RouterLink
          v-if="authStore.currentUser"
          :to="{ name: 'exam', params: { levelId: authStore.currentUser.level } }"
          class="border-b-2 border-transparent px-3 py-3 text-sm whitespace-nowrap text-blue-400 transition hover:text-blue-300"
        >
          Take Exam
        </RouterLink>
      </div>
    </nav>

    <main class="mx-auto max-w-5xl px-4 py-8">
      <RouterView />
    </main>
  </div>
</template>
