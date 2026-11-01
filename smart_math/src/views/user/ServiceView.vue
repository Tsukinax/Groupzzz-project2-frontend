<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import FeatureList from '@/components/FeatureList.vue'
import { useProfileStore } from '@/stores/profile'

const { level } = storeToRefs(useProfileStore())

const services = computed(() =>
  (level.value?.services ?? []).map((service) => ({
    id: service.id,
    title: service.name,
    description: service.description,
  })),
)
</script>

<template>
  <div>
    <h2 class="mb-1 text-xl font-semibold text-white">Available Services</h2>
    <p class="mb-5 text-sm text-zinc-500">
      Services for {{ level?.name ?? 'your level' }}. Pass the exam to unlock more.
    </p>
    <FeatureList :items="services" empty-text="There are no services for this level yet." />
  </div>
</template>
