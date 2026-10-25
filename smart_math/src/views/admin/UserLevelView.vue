<script setup lang="ts">
import {computed,onMounted} from 'vue'
import { useUserStore } from '@/stores/user';
import { useHistoryStore } from '@/stores/history';

const userStore = useUserStore()
const historyStore = useHistoryStore()
onMounted(async () =>{
    if (!historyStore.isLoaded){
        await historyStore.loadHistory()
    }
})
const examHistory = computed(()=>{
    const user = userStore.currentUser;
    if (user === null){
        return []
    }
    return historyStore.getAttemptsByUser(user.id)
})
</script>
<template>
    <div class="space-y-6">
        <div class="bg-zinc-900 p-6 flex items-center gap-4 border border-zinc-800 rounded-xl" v-if="userStore.currentUser">
            <span class="text-zinc-400">Current Level</span>
            <span class="px-2.5 py-0.5 bg-blue-600 text-white rounded-xl">{{ userStore.levelLabel }}</span>
            <span class="text-zinc-400 ml-auto">Exam History: {{ examHistory.length }}</span>
        </div>
        <div class="bg-zinc-900 p-6 border border-zinc-800 rounded-xl">
            <h2 class="text-white mb-4">Exam History</h2>
            <div class="flex text-zinc-400 pb-2 border-b border-zinc-800">
                <span class="w-32">Level</span>
                <span class="w-32">Score</span>
                <span class="w-32">Result</span>
                <span class="w-32"></span>
            </div>
            <div v-for="result in examHistory" :key="result.id" class="flex items-center py-2 text-white">
                <span class="w-32">{{ result.level_id }}</span>
                <span class="w-32">{{ result.score }}</span>
                <span class="w-32" :class="result.result === 'pass' ? 'text-green-400' : 'text-red-400'">{{ result.result }}</span>
            </div>
            <p class="text-zinc-500 py-4" v-if="examHistory.length === 0">No exam history.</p>
        </div>
    </div>
</template>