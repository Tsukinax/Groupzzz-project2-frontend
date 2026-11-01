<script setup lang="ts">
import { onUnmounted } from 'vue';
import { useUserStore } from '@/stores/user';


const userStore = useUserStore();
onUnmounted(()=> userStore.clearCurrentUser());

</script>
<template>
    <div class="px-10 pt-3">
        <div v-if ="userStore.currentUser">
            <RouterLink class="text-zinc-400" :to="{name: 'admin-users'}">Back to users</RouterLink>
            <div class="flex items-center gap-3 mt-2 mb-6">
                <h1 class="text-white text-2xl">{{userStore.currentUser.name}}</h1>
                <span class="px-2.5 py-0.5 bg-blue-500 text-white rounded-xl">L{{ userStore.currentUser.level }}</span>
                <span class="text-zinc-400">{{userStore.currentUser.province}}</span>
                <span :class="userStore.currentUser.status === 'Active' ? 'text-green-400' : 'text-red-400'">{{ userStore.currentUser.status === 'Active' ? 'Active' : 'Deactivated' }}</span>


            </div>
            <div class="flex gap-6 border-b border-zinc-800 mb-6">
                <RouterLink :to="{name:'admin-user-info'}" class="pb-3 text-zinc-400 hover:text-zinc-200" exact-active-class="text-white border-b-2 border-blue-500 font-medium">Info</RouterLink>
                <RouterLink :to="{name:'admin-user-level'}" class="pb-3 text-zinc-400 hover:text-zinc-200" exact-active-class="text-white border-b-2 border-blue-500 font-medium">Level</RouterLink>
                <RouterLink :to="{name:'admin-user-edit'}" class="pb-3 text-zinc-400 hover:text-zinc-200" exact-active-class="text-white border-b-2 border-blue-500 font-medium">Edit</RouterLink>
            </div>
            <RouterView/>
        </div>
    </div>
</template>