<template>
  <main class="flex min-h-screen flex-col items-center justify-center bg-zinc-900 px-4 text-center">
    <p class="text-6xl font-bold text-blue-600">Uh-Oh!</p>
    <h1 class="mt-4 text-2xl font-semibold text-white">It looks like you're experiencing some network issues.</h1>
    <p class="mt-2 text-zinc-400">Please take a breath and try again.</p>

    <button
      type="button"
      class="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500"
      @click="$router.go(-1)"
    >
      Try again
    </button>
  </main>
</template>
