<script setup lang="ts">
interface FeatureItem {
  id: number
  title: string
  description: string
}

defineProps<{
  items: FeatureItem[]
  emptyText: string
}>()
</script>

<template>
  <div v-if="items.length > 0" class="grid gap-3 sm:grid-cols-2">
    <article
      v-for="item in items"
      :key="item.id"
      class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-4"
    >
      <h3 class="font-medium text-zinc-100">{{ item.title }}</h3>
      <p class="mt-1 text-sm text-zinc-400">{{ item.description }}</p>
    </article>
  </div>
  <p v-else class="text-zinc-500">{{ emptyText }}</p>
</template>
