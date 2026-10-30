<script setup lang="ts">
import ErrorMessage from './ErrorMessage.vue'
import { PROVINCES } from '@/constants/provinces'

interface ProvinceSelectProps {
  modelValue: string
  id: string
  error?: string
}
withDefaults(defineProps<ProvinceSelectProps>(), {
  error: '',
})
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <select
      :id="id"
      :value="modelValue"
      class="w-full rounded-xl border bg-zinc-950 px-3 py-1.5 text-white outline-none"
      :class="error ? 'border-red-500' : 'border-zinc-700 hover:border-zinc-500'"
      :aria-describedby="error ? `${id}-error` : undefined"
      @change="$emit('update:modelValue', ($event.target as HTMLSelectElement).value)"
    >
      <option value="" disabled>Select province</option>
      <option v-for="province in PROVINCES" :key="province" :value="province">{{ province }}</option>
    </select>
    <ErrorMessage v-if="error" :id="`${id}-error`" class="text-sm text-red-400">{{ error }}</ErrorMessage>
  </div>
</template>
