<script setup lang="ts">
import { onMounted ,ref} from 'vue';
import { useLevelStore } from '@/stores/level';
import { useRouter } from 'vue-router'

const levelStore=useLevelStore()
const isLoading= ref(false)
const router = useRouter()
onMounted(async()=>{
    isLoading.value = true
    try{
        await levelStore.loadData()
    
    }
    catch{
        router.push({ name: 'network-error-view' })
    }finally{
        isLoading.value=false
    }
    
})
</script>
<template>
    <div class="px-10 pt-3">
        <h1 class="text-white text-2xl pb-4">Levels</h1>
        <div class="space-y-3">
            <p v-if="isLoading" class="text-zinc-500 text-center py-10">Loading levels...</p>

            <p v-else-if="levelStore.levels.length === 0" class="text-zinc-500 text-center py-10">
                No levels found.
            </p>
            <template v-else>
                <RouterLink :to="{name:'admin-level',params:{id: level.id} }" v-for="level in levelStore.levels" :key="level.id" class="bg-zinc-900 border border-zinc-800 hover:border-zinc-600 hover:bg-zinc-800/80 p-4 text-white block">
                <div class="flex justify-between gap-4">
                    <div>
                        <h2 class="text-white text-lg">{{ level.name }}</h2>
                        <p class="text-zinc-400 text-sm mt-1">{{ level.description }}</p>
                    </div>
                    <div class="flex gap-2">
                        <span class="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-xl">pass: {{ level.passScore }}</span>
                        <span class="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-xl">benefits: {{ level.benefits.length }}</span>
                        <span class="bg-zinc-800 text-zinc-300 text-xs px-2 py-1 rounded-xl">service: {{ level.services.length }}</span>
                        
                    </div>
            
                </div>
                
                
            </RouterLink>
            </template>
            
        </div>
        
    </div>
    
</template>