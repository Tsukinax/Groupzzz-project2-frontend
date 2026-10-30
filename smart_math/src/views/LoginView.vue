<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-10">
    <div class="w-full max-w-sm">
      <header class="mb-8 text-center">
        <RouterLink :to="{ name: 'landing' }" class="text-sm text-zinc-500 hover:text-zinc-300">
          Smart Math Passport
        </RouterLink>
        <h1 class="mt-2 text-3xl font-bold text-white">Welcome back</h1>
      </header>

      <div class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl sm:p-8">
        <LoginForm />
      </div>
    </div>
  </main>
</template>
