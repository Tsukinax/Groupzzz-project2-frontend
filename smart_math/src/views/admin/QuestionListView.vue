<script setup lang="ts">
import { onMounted,computed, ref } from 'vue';
import { useQuestionStore } from '@/stores/question';
import QuestionCard from '@/components/QuestionCard.vue'
import { useRoute,useRouter, } from 'vue-router';
import { useLevelStore } from '@/stores/level';
import QuestionForm from '@/components/QuestionForm.vue';
import type { NewQuestion } from '@/types/exam';

const questionStore=useQuestionStore()
const isLoading = ref(false)
onMounted(async()=>{
    isLoading.value= true
    try{
       if (!questionStore.isLoaded){
        await questionStore.loadQuestions()
    } if (!levelStore.isLoaded){
        await levelStore.loadData()
    }
    } finally{
        isLoading.value=false
    }
    
    
})

const route=useRoute()
const router=useRouter()
const levelStore=useLevelStore()

const level = ref((route.query.level as string)||'')

function updateFilter(){
    const query: Record<string, string> = {} 
    if (level.value){
        query.level=level.value
    }
    router.push({query})
}

const filteredQuestions = computed(()=>{
    const levelID = route.query.level
    if(!levelID){
        return questionStore.questions
    }
    return questionStore.getQuestionsByLevel(Number(levelID))
})

function handleSubmit(payload:NewQuestion){
    questionStore.addQuestion(payload)
}

</script>
<template>
    <div class="px-10 pt-3">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-white text-2xl">Question</h1>
            <div class="text-zinc-400">Question: {{ filteredQuestions.length }}</div>
        </div>
        
        <select v-model="level" @change="updateFilter" class="w-48 border  bg-zinc-900 border-zinc-700 px-3 py-2 text-white rounded-xl hover:border-zinc-500 mb-4">
            <option value="">All Levels</option>
            <option v-for="lv in levelStore.levels" :key="lv.id" :value="lv.id">{{lv.name}}</option>
        </select>
        <QuestionForm :levels="levelStore.levels" @submit="handleSubmit"></QuestionForm>
        <div class="space-y-1">
            <p v-if="isLoading" class="text-zinc-500 text-center py-10">Loading...</p>
            <p v-else-if="filteredQuestions.length===0" class="text-zinc-500 text-center py-10">No questions</p>
            <template v-else>
                <QuestionCard v-for="q in filteredQuestions" :key="q.id" :question="q" class="mb-5"/>
            </template>
            
        </div>
        
    </div>
    
</template>