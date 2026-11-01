<script setup lang="ts">
import type { User } from '@/types/user'

defineProps<{
    user: User
}>();
const emit =defineEmits<{
    (e:'select',id: number): void;
}>();
</script>

<template>
    <tr @click ="emit('select',user.id)" class="hover:bg-zinc-800 cursor-pointer">
        <td class="px-4 py-3 text-zinc-100">
            <div class="flex items-center gap-3">
                <img v-if="user.image" :src="user.image" alt="profile" class="w-8 h-8 rounded-lg border border-zinc-700 object-cover"/>
                <span>{{ user.name }} {{ user.surname }}</span>
            </div>
        </td>
        <td class="px-4 py-3 text-zinc-100">{{ user.levelName }}</td>
        <td class="px-4 py-3 text-zinc-100">{{ user.province }}</td>
        <td class="px-4 py-3" :class="user.status === 'Active' ? 'text-green-400' : 'text-red-400'">{{ user.status === 'Active' ? 'Active' : 'Deactivated' }}</td>
    </tr>

</template>
