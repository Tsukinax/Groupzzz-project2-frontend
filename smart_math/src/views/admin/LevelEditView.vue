<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
import {computed,onMounted} from 'vue';
import { useLevelStore } from '@/stores/level';
import { ref } from 'vue';
import type {Level} from '@/types/level'

const route = useRoute()
const router = useRouter()
const levelStore = useLevelStore()
onMounted(async()=>{
    if(!levelStore.isLoaded){
        await levelStore.loadData()
    }
    if(level.value){
        form.value={...level.value}
    }
})
const level = computed(()=> levelStore.getLevelById(Number(route.params.id)))
const emptyLevel: Level ={
    id:0, name:'',pass_score: 0, description:'',
} 
const form = ref(
    level.value? {...level.value}:{...emptyLevel}
);
function saveLevel(){
    levelStore.updateLevel(form.value)
    backToDetail()
}
function backToDetail(){
    router.push({name:'admin-level',params:{id: route.params.id}})
}

</script>
<template>
    <div class="px-10 pt-3">
        <div v-if="level">
            <h1 class="text-white text-2xl">Edit {{ level.name }}</h1>
            <div class="bg-zinc-900 p-6 space-y-4 mt-6 border border-zinc-800 rounded-xl">
                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Name</span>
                    <input type="text" v-model="form.name" class="bg-zinc-950 border border-zinc-700 px-3 py-1.5 text-white hover:border-zinc-500 rounded-xl outline-none"/>
                </div>

                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Pass Score</span>
                    <input class="bg-zinc-950 border border-zinc-700 px-3 py-2 text-white hover:border-zinc-500 rounded-xl outline-none" type="number" v-model.number="form.pass_score"/>
                </div>

                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Description</span>
                    <textarea class="bg-zinc-950 border border-zinc-700 px-3 py-2 text-white  hover:border-zinc-500 rounded-xl outline-none" v-model="form.description"></textarea>
                </div>
                
                <div class="flex gap-3 pt-4">
                        <button class="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 font-medium rounded-xl" @click="saveLevel">Save</button>
                        <button class="px-5 py-2 bg-zinc-800 text-white hover:bg-zinc-700 font-medium rounded-xl" @click="backToDetail">Cancel</button>
                    </div>
            </div>
        </div>
        <div v-else>
            <h1 class="text-white text-2xl">Level not found</h1>
        </div>
        
    </div>
</template>