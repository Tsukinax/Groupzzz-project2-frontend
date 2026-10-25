<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { User } from '@/types/user'

defineProps<{
  user: User
}>()

const emit = defineEmits<{
  logout: []
}>()
</script>

<template>
  <div class="flex items-center gap-3">
    <RouterLink
      :to="{ name: 'user-profile', params: { id: user.id } }"
      class="flex items-center gap-2 rounded-full py-1 pr-3 pl-1 transition hover:bg-zinc-800"
    >
      <img
        :src="user.image"
        :alt="user.name"
        class="h-9 w-9 rounded-full border-2 border-blue-500 object-cover"
      />
      <span class="hidden text-sm text-zinc-200 sm:inline">
        {{ user.name }} {{ user.surname }}
      </span>
      <span class="rounded-full bg-blue-600 px-2 py-0.5 text-xs font-medium text-white">
        L{{ user.level }}
      </span>
    </RouterLink>

    <button
      type="button"
      class="text-sm text-zinc-500 transition hover:text-zinc-300"
      @click="emit('logout')"
    >
      logout
    </button>
  </div>
</template>
