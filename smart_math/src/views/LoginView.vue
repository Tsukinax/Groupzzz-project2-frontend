<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const password = ref('')
const errorMessage = ref('')

onMounted(() => {
  if (!authStore.isLoaded) {
    authStore.loadUsers()
  }
})

function handleSubmit() {
  errorMessage.value = ''

  if (!username.value) {
    errorMessage.value = 'Please enter your username'
    return
  }

  const user = authStore.login(username.value)

  if (user === null) {
    errorMessage.value = 'This username was not found in the system'
    return
  }

  if (authStore.isAdmin) {
    router.push({ name: 'admin-users' })
    return
  }

  router.push({ name: 'user-profile', params: { id: user.id } })
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-10">
    <div class="w-full max-w-sm">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white">Login</h1>
        <p class="mt-2 text-zinc-400">Smart Math Passport</p>
      </header>

      <form
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl sm:p-8"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div>
          <label for="username" class="mb-1.5 block text-sm font-medium text-zinc-400">
            Username
          </label>
          <input
            id="username"
            v-model.trim="username"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
            placeholder="admin, user1, user2"
          />
        </div>

        <div class="mt-4">
          <label for="password" class="mb-1.5 block text-sm font-medium text-zinc-400">
            Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            class="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-zinc-100 placeholder:text-zinc-600 focus:border-blue-500 focus:outline-none"
            placeholder="Enter anything."
          />
        </div>

        <p v-if="errorMessage" class="mt-4 rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500"
        >
          Login
        </button>

        <p class="mt-4 text-center text-sm text-zinc-500">
          Don't have an account yet?
          <RouterLink :to="{ name: 'register' }" class="text-blue-400 hover:underline">
            Register
          </RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
