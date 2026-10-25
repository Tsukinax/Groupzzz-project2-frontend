<script setup lang="ts">
defineProps<{
    user: {
        id: number;
        name: string;
        level: number;
        province: string;
        status: string;
    };
}>();
const emit =defineEmits<{
    (e:'select',id: number): void;
}>();
</script>

<template>
    <tr @click ="emit('select',user.id)" class="hover:bg-zinc-800">   
        <td class="px-4 py-3 text-zinc-100">{{ user.name }}</td>
        <td class="px-4 py-3 text-zinc-100">{{ user.level }}</td>
        <td class="px-4 py-3 text-zinc-100">{{ user.province }}</td>
        <td class="px-4 py-3" :class="user.status === 'Active' ? 'text-green-400' : 'text-red-400'">{{ user.status }}</td>
    </tr>

</template>