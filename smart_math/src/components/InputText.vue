<script setup lang="ts">
import { computed } from 'vue'
import ErrorMessage from './ErrorMessage.vue'

interface InputTextProps {
  modelValue: string | number
  id: string
  type?: string
  placeholder?: string
  error?: string
}
const props = withDefaults(defineProps<InputTextProps>(), {
  type: 'text',
  placeholder: '',
  error: '',
})
defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const placeholderErrorClass = computed(() =>
  props.error ? 'border-red-500' : 'border-zinc-700 hover:border-zinc-500',
)
</script>

<template>
  <div class="flex flex-col gap-1">
    <input
      :type="type"
      :id="id"
      class="bg-zinc-950 border px-3 py-1.5 text-white rounded-xl outline-none"
      :class="placeholderErrorClass"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement)?.value)"
      v-bind="$attrs"
      :aria-describedby="error ? `${id}-error` : undefined"
      :aria-invalid="error ? true : false"
    />
    <ErrorMessage class="text-sm text-red-400" v-if="error" :id="`${id}-error`">
      {{ error }}
    </ErrorMessage>
  </div>
</template>
