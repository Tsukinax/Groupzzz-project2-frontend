<script setup lang="ts">
import { ref, watch } from 'vue'
import ErrorMessage from './ErrorMessage.vue'

interface ImageUploadProps {
  modelValue: File | null
  id: string
  currentImage?: string
  error?: string
}
const props = withDefaults(defineProps<ImageUploadProps>(), {
  currentImage: '',
  error: '',
})
const emit = defineEmits<{
  (e: 'update:modelValue', value: File | null): void
}>()

const previewUrl = ref(props.currentImage)

watch(
  () => props.modelValue,
  (file, _, onCleanup) => {
    if (!file) {
      previewUrl.value = props.currentImage
      return
    }
    const objectUrl = URL.createObjectURL(file)
    previewUrl.value = objectUrl
    onCleanup(() => URL.revokeObjectURL(objectUrl))
  },
)

function onFileChange(event: Event) {
  const input = event.target as HTMLInputElement
  emit('update:modelValue', input.files?.[0] ?? null)
}
</script>

<template>
  <div class="flex items-center gap-4">
    <img
      v-if="previewUrl"
      :src="previewUrl"
      alt="Profile preview"
      class="h-20 w-20 shrink-0 rounded-full border-2 border-blue-500 object-cover"
    />
    <div
      v-else
      class="flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-zinc-700 text-xs text-zinc-500"
    >
      No image
    </div>

    <div class="flex flex-col items-start gap-1">
      <label
        :for="id"
        class="cursor-pointer rounded-lg border border-zinc-700 px-3 py-2 text-sm text-zinc-200 transition hover:border-zinc-500"
      >
        Choose image
      </label>
      <input
        :id="id"
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp"
        class="sr-only"
        :aria-describedby="error ? `${id}-error` : undefined"
        @change="onFileChange"
      />
      <span class="text-xs text-zinc-500">PNG, JPG, GIF or WEBP up to 10 MB</span>
      <ErrorMessage v-if="error" :id="`${id}-error`" class="text-sm text-red-400">{{ error }}</ErrorMessage>
    </div>
  </div>
</template>
