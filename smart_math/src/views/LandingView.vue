<script setup lang="ts">
import LoginForm from '@/components/LoginForm.vue'

const LEVELS = [
  { id: 1, name: 'Addition & Subtraction', description: 'The starting point for everyone' },
  { id: 2, name: 'Multiplication & Division', description: 'Including multiplication tables' },
  { id: 3, name: 'Fractions & Decimals', description: 'Work with parts of a whole' },
  { id: 4, name: 'Basic Algebra', description: 'Solving equations for x' },
]
</script>

<template>
  <main class="min-h-screen bg-zinc-900">
    <section
      class="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:py-20 lg:grid-cols-[1fr_400px]"
    >
      <div class="text-center lg:text-left">
        <p class="text-sm font-medium tracking-wide text-blue-400 uppercase">Smart Math Passport</p>
        <h1 class="mt-3 text-4xl font-bold text-white sm:text-5xl">Level up your math skills</h1>
        <p class="mx-auto mt-4 max-w-xl text-lg text-zinc-400 lg:mx-0">
          Study each level, pass the exam, and unlock new benefits and services as you grow.
        </p>

        <ol class="mt-10 grid gap-3 text-left sm:grid-cols-2">
          <li
            v-for="level in LEVELS"
            :key="level.id"
            class="flex gap-3 rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
          >
            <span
              class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white"
            >
              L{{ level.id }}
            </span>
            <div>
              <h2 class="font-semibold text-zinc-100">{{ level.name }}</h2>
              <p class="text-sm text-zinc-400">{{ level.description }}</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 shadow-xl sm:p-8">
        <h2 class="mb-6 text-xl font-semibold text-white">Login to your passport</h2>
        <LoginForm />
      </div>
    </section>
  </main>
</template>
