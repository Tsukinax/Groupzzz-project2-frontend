<script setup lang="ts">
import {computed} from 'vue'
import {useRoute} from 'vue-router'
const props=defineProps<{
    currentPage: number;
    totalPages: number;
}>();

const hasPrev =computed(() => props.currentPage > 1);
const hasNext= computed(() => props.currentPage < props.totalPages);
const route=useRoute();
</script>
<template>
    
    <div class="flex gap-2 justify-between mt-4 items-center">
            <div class="text-white">Page {{ props.currentPage }} of {{ props.totalPages }}</div>
            <div class="flex gap-2">    
                <RouterLink class="px-4 py-2 bg-blue-500 text-white" v-if="hasPrev" :to=" {query:{...route.query, page:props.currentPage - 1}} ">Prev</RouterLink>
                <RouterLink class="px-4 py-2 bg-blue-500 text-white" v-if="hasNext" :to=" {query:{...route.query, page:props.currentPage + 1}} ">Next</RouterLink>
            </div>
            
        </div>
</template>