<script setup lang="ts">
interface SelectOption {
  value: string
  label: string
}
interface BaseSelectProps {
  options: SelectOption[]
  placeholder?: string
}

const modelValue = defineModel<string>()
const props = withDefaults(defineProps<BaseSelectProps>(), {
  placeholder: '',
})
</script>

<template>
  <select
    v-bind="$attrs"
    v-model="modelValue"
    class="w-full md:w-48 bg-zinc-900 border border-zinc-700 px-3 py-2 text-white hover:border-zinc-500 rounded-xl"
  >
    <option v-if="props.placeholder" value="">{{ props.placeholder }}</option>
    <option
      v-for="option in props.options"
      :key="option.value"
      :value="option.value"
      :selected="option.value === modelValue"
    >
      {{ option.label }}
    </option>
  </select>
</template>
