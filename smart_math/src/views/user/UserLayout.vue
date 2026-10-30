<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import ProfileMenu from '@/components/ProfileMenu.vue'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { useProfileStore } from '@/stores/profile'

const router = useRouter()
const authStore = useAuthStore()
const profileStore = useProfileStore()
const { currentUser } = storeToRefs(authStore)
const { message } = storeToRefs(useMessageStore())

const linkClass =
  'border-b-2 border-transparent px-3 py-3 text-sm whitespace-nowrap text-zinc-400 transition hover:text-zinc-200'
const activeClass = 'border-blue-500 text-white'

onMounted(() => authStore.fetchCurrentUser())

watch(() => currentUser.value?.level, () => profileStore.loadLevel(), { immediate: true })

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'landing' })
}
</script>

<template>
  <div v-if="currentUser" class="min-h-screen bg-zinc-900">
    <header class="sticky top-0 z-10 border-b border-zinc-800 bg-zinc-950/95 backdrop-blur">
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <RouterLink :to="{ name: 'user-home' }" class="font-bold text-white">
          Smart Math Passport
        </RouterLink>
        <ProfileMenu :user="currentUser" @logout="handleLogout" />
      </div>

      <nav class="mx-auto flex max-w-5xl gap-1 overflow-x-auto px-4">
        <RouterLink :to="{ name: 'user-home' }" :class="linkClass" :exact-active-class="activeClass">
          Home
        </RouterLink>
        <RouterLink :to="{ name: 'user-profile' }" :class="linkClass" :active-class="activeClass">
          Profile
        </RouterLink>
        <RouterLink
          :to="{ name: 'learning', params: { levelId: currentUser.level } }"
          :class="linkClass"
          :active-class="activeClass"
        >
          E-Learning
        </RouterLink>
        <RouterLink
          :to="{ name: 'exam', params: { levelId: currentUser.level } }"
          :class="[linkClass, 'text-blue-400']"
          :active-class="activeClass"
        >
          Take Exam
        </RouterLink>
      </nav>
    </header>

    <main class="mx-auto max-w-5xl px-4 py-8">
      <p
        v-if="message"
        class="mb-6 rounded-xl border border-blue-700 bg-blue-900/40 px-4 py-3 text-blue-200"
      >
        {{ message }}
      </p>
      <RouterView />
    </main>
  </div>
</template>
