<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { User } from '@/types/user'

defineProps({
  user: {
    type: Object as PropType<User>,
    required: true
  },
  levelLabel: {
    type: String,
    default: '-'
  },
  showStatusToggle: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle-status'])
const isConfirming = ref(false)

function confirmToggle(id: number) {
  isConfirming.value = false
  emit('toggle-status', id)
}

</script>

<template>
  <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
    <div class="flex items-center gap-4 pb-2 border-b border-zinc-800">
      <img v-if="user.image" :src="user.image" alt="profile" class="w-20 h-20 rounded-xl border border-zinc-700"/>
      <div>
        <h2 class="text-white text-xl font-bold">{{ user.name }} {{ user.surname }}</h2>
        <p class="text-zinc-400">{{ user.email }}</p>
      </div>
    </div>

    <div class="flex">
      <span class="text-zinc-400 w-32">User ID</span>
      <span class="text-white">{{ user.id }}</span>
    </div>
    <div class="flex">
        <span class="text-zinc-400 w-32">User Name</span>
        <span class="text-white">{{ user.name }}</span>
    </div>
    <div class="flex">
        <span class="text-zinc-400 w-32">Surname</span>
        <span class="text-white">{{ user.surname }}</span>
    </div>
    <div class="flex">
        <span class="text-zinc-400 w-32">Email</span>
        <span class="text-white">{{ user.email }}</span>
    </div>


    <div class="flex">
      <span class="text-zinc-400 w-32">Level</span>
      <span class="text-white">{{ levelLabel }}</span>
    </div>
    <div class="flex">
      <span class="text-zinc-400 w-32">Province</span>
      <span class="text-white">{{ user.province }}</span>
    </div>

    

    <div class="flex items-center">
      <span class="text-zinc-400 w-32">Status</span>
      <span :class="user.status === 'Active' ? 'text-green-400' : 'text-red-400'">{{ user.status }}</span>
      <template v-if="showStatusToggle">
        <button
          v-if="!isConfirming"
          @click="isConfirming = true"
          class="ml-4 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 rounded-lg">
          {{ user.status === 'Active' ? 'Deactivate' : 'Activate' }}
        </button>
        <template v-else>
          <button
            @click="confirmToggle(user.id)"
            :class="user.status === 'Active' ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'"
            class="ml-4 px-3 text-white rounded-lg">
            {{ user.status === 'Active' ? 'Confirm deactivate' : 'Confirm activate' }}
          </button>
          <button
            @click="isConfirming = false"
            class="ml-2 px-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-600 rounded-lg">
            Cancel
          </button>
        </template>
      </template>
    </div>
  </div>
</template>
