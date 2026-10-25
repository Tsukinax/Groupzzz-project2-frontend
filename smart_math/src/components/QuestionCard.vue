<script setup lang="ts">
import type { Question } from '@/types/exam';

defineProps<{
    question: Question

}>()

</script>

<template>
    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-white">
        <div class="font-medium mb-2">{{ question.question }}</div>
        <div class="grid grid-cols-2 gap-2">
            <div v-for="choice in question.choices" :key="choice" class="border px-3 py-1.5" :class="choice === question.correct_answer ? 'border-green-500 text-green-400' : 'border-zinc-700 text-zinc-300'">
                {{ choice }}
            </div>
        </div>
    </div>
</template>


