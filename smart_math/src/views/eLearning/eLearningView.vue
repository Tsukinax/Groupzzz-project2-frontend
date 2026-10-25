<script setup lang="ts">
import { useRoute } from 'vue-router'
import { mockLearningContent } from '@/mocks/learningContent'

const route = useRoute()

const levelId = Number(route.params.levelId)

const content = mockLearningContent.find((item) => item.level_id === levelId)
</script>

<template>
  <div class="min-h-screen bg-zinc-900 flex flex-col items-center justify-center px-6 py-10">
    <div v-if="content" class="w-full max-w-2xl">
      <h1 class="text-2xl font-semibold text-white mb-6 text-center">
        {{ content.title }}
      </h1>

      <div class="border border-slate-700 rounded-xl overflow-hidden bg-slate-800 p-3">
        <div class="aspect-video">
          <iframe
            :src="content.youtube_url"
            class="w-full h-full rounded-lg"
            frameborder="0"
            allow="
              accelerometer;
              autoplay;
              clipboard-write;
              encrypted-media;
              gyroscope;
              picture-in-picture;
            "
            allowfullscreen
          >
          </iframe>
        </div>
      </div>
    </div>

    <div v-else class="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
      <p class="text-slate-400">No learning content found for this level.</p>
    </div>

    <div class="w-full max-w-2xl flex justify-between mt-6">
      <RouterLink
        :to="{ name: 'landing' }"
        class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Home
      </RouterLink>

      <RouterLink
        :to="{ name: 'exam', params: { levelId } }"
        class="px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600"
      >
        Take Exam
      </RouterLink>
    </div>
  </div>
</template>
