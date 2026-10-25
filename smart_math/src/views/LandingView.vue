<script setup lang="ts">
import { RouterLink } from 'vue-router'

const LEVELS = [
  {
    id: 1,
    name: 'Addition & Subtraction',
    description: 'Adding and Subtracting Integers: A Starting Point for Everyone',
  },
  { id: 2, name: 'Multiplication & Division', description: 'Multiplication and division, including multiplication tables.' },
  { id: 3, name: 'Fractions & Decimals', description: 'Fractions and Decimals' },
  { id: 4, name: 'Basic Algebra', description: 'Basic Algebra: Solving Equations for x' },
]
</script>

<template>
  <main class="min-h-screen bg-zinc-900">
    <section class="mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
      <h1 class="text-4xl font-bold text-white sm:text-5xl">Smart Math Passport</h1>
      <p class="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
        Gradually advance your mathematical skills; pass exams to level up and unlock new services and benefits.
      </p>

      <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <RouterLink
          :to="{ name: 'login' }"
          class="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
        >
          Login
        </RouterLink>
        <RouterLink
          :to="{ name: 'register' }"
          class="rounded-lg border border-zinc-700 px-6 py-3 font-medium text-zinc-200 transition hover:border-zinc-500"
        >
          Register
        </RouterLink>
      </div>
    </section>

    <section class="mx-auto max-w-4xl px-4 pb-20">
      <h2 class="mb-6 text-center text-xl font-semibold text-white">4 Levels in the System</h2>

      <div class="grid gap-4 sm:grid-cols-2">
        <article
          v-for="level in LEVELS"
          :key="level.id"
          class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-5"
        >
          <span
            class="inline-block rounded-full bg-blue-600 px-3 py-1 text-sm font-medium text-white"
          >
            Level {{ level.id }}
          </span>
          <h3 class="mt-3 font-semibold text-zinc-100">{{ level.name }}</h3>
          <p class="mt-1 text-sm text-zinc-400">{{ level.description }}</p>
        </article>
      </div>
    </section>
  </main>
</template>
