<script setup lang="ts">
import { useRoute } from 'vue-router';
import { computed,onMounted,ref } from 'vue';
import { useLevelStore } from '@/stores/level';

const route = useRoute();
const levelStore=useLevelStore()
const isLoading = ref(false)
onMounted(async()=>{
    isLoading.value = true
    try{
        if(!levelStore.isLoaded){
            await levelStore.loadData()
        }
    } finally {
        isLoading.value = false
    }
})

const levelId = computed(()=>Number(route.params.id))
const level = computed(()=>levelStore.getLevelById(levelId.value))
const benefits = computed(()=>levelStore.getBenefitsByLevel(levelId.value))
const services = computed(()=> levelStore.getServicesByLevel(levelId.value))
</script>

<template>
    <div class="px-10 pt-3">
        <RouterLink class="text-zinc-400" :to="{name: 'admin-levels'}">Back to levels</RouterLink>
        <p v-if="isLoading" class="text-zinc-500 text-center py-10">Loading level...</p>
        <div v-else-if="level" class="mt-4">
            <div class="flex items-center gap-3">
                <h1 class="text-white text-2xl">{{ level.name }}</h1>
                <span class="px-2.5 py-0.5 bg-blue-600 text-white text-xs rounded-xl">Pass: {{ level.pass_score }}</span>
            </div>
            
            <div class="grid grid-cols-2 gap-4 mt-6 pb-5">
                <div class="bg-zinc-900 p-5 text-zinc-400 border border-zinc-800 rounded-xl">
                    <div class="pb-3 text-white">Description</div>
                    <p class="text-white pb-4">{{ level.description }}</p>
                    <div class="pb-3 text-white">Benefits</div>
                    <ul class="text-zinc-300 space-y-1">
                        <li v-for="b in benefits" :key="b.id">- {{ b.title }}: {{ b.description }}</li>
                    </ul>
                </div>
                <div class="bg-zinc-900 p-5 border border-zinc-800 rounded-xl">
                    <div class="pb-3 text-white">Services</div>
                    <ul class="text-zinc-300 space-y-1">
                        <li v-for="s in services" :key="s.id">- {{ s.name }}: {{ s.description }}</li>
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

