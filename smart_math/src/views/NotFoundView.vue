<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 text-center">
    <p class="text-6xl font-bold text-blue-600">404</p>
    <h1 class="mt-4 text-2xl font-semibold text-white">The requested page was not found.</h1>
    <p class="mt-2 text-zinc-400">The page you are trying to access may have been moved or does not exist.</p>

    <RouterLink
      :to="{ name: 'landing' }"
      class="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
    >
      Return to Home Page
    </RouterLink>
  </main>
</template>
