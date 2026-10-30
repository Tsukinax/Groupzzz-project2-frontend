<script setup lang="ts">
import { useRoute } from 'vue-router';

import { useLevelStore } from '@/stores/level';
import { storeToRefs } from 'pinia'

const route = useRoute();
const levelStore=useLevelStore()
const { currentLevel: level } = storeToRefs(levelStore)


</script>

<template>
    <div class="px-10 pt-3">
        <RouterLink class="text-zinc-400" :to="{name: 'admin-levels'}">Back to levels</RouterLink>
        <div v-if="level" class="mt-4">
            <div class="flex items-center gap-3">
                <h1 class="text-white text-2xl">{{ level.name }}</h1>
                <span class="px-2.5 py-0.5 bg-blue-600 text-white text-xs rounded-xl">Pass: {{ level.passScore }}</span>
            </div>
            
            <div class="gridgrid-cols-1 md:grid-cols-2 gap-4 mt-6 pb-5">
                <div class="bg-zinc-900 p-5 text-zinc-400 border border-zinc-800 rounded-xl">
                    <div class="pb-3 text-white">Description</div>
                    <p class="text-white pb-4">{{ level.description }}</p>
                    <div class="pb-3 text-white">Benefits</div>
                    <ul class="text-zinc-300 space-y-1">
                        <li v-for="b in level.benefits" :key="b.id">- {{ b.title }}: {{ b.description }}</li>
                    </ul>
                </div>
                <div class="bg-zinc-900 p-5 border border-zinc-800 rounded-xl">
                    <div class="pb-3 text-white">Services</div>
                    <ul class="text-zinc-300 space-y-1">
                        <li v-for="s in level.services" :key="s.id">- {{ s.name }}: {{ s.description }}</li>
                    </ul>
                    
                </div>
            </div>
            <RouterLink :to="{name:'admin-level-edit', params:{id:level.id}}" class="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium inline-block rounded-xl">
                Edit
            </RouterLink>
        </div>
        <div v-else class="text-zinc-500 text-center py-10">
            Level not found
        </div>
    </div>
    
    
</template>

