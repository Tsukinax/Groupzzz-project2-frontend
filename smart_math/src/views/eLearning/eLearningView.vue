<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ExamService from '@/services/ExamService'
import type { ElearningContent } from '@/types/elearning'

const router = useRouter()
const contents = ref<ElearningContent[]>([])
const isLoading = ref(true)

onMounted(async () => {
  try {
    const response = await ExamService.getElearning()
    contents.value = response.data
  } catch {
    router.push({ name: 'network-error-view' })
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="min-h-screen bg-zinc-900 flex flex-col items-center justify-center px-6 py-10">
    <p v-if="isLoading" class="text-slate-400">Loading lesson...</p>

    <div v-else-if="contents.length > 0" class="w-full max-w-2xl space-y-8">
      <div v-for="content in contents" :key="content.id">
        <h1 class="text-2xl font-semibold text-white mb-2 text-center">
          {{ content.title }}
        </h1>
        <p v-if="content.description" class="text-slate-400 text-center mb-4">
          {{ content.description }}
        </p>

        <div class="border border-slate-700 rounded-xl overflow-hidden bg-slate-800 p-3">
          <div class="aspect-video">
            <iframe
              :src="content.videoUrl"
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
    </div>

    <div v-else class="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center">
      <p class="text-slate-400">No learning content found for your level.</p>
    </div>

    <div class="w-full max-w-2xl flex justify-between mt-6">
      <RouterLink
        :to="{ name: 'user-home' }"
        class="px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
      >
        Home
      </RouterLink>

      <RouterLink
        :to="{ name: 'exam' }"
        class="px-5 py-2.5 rounded-lg bg-green-500 text-white hover:bg-green-600"
      >
        Take Exam
      </RouterLink>
    </div>
  </div>
</template>
