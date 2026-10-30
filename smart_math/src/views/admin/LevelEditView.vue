<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
import {computed,onMounted} from 'vue';
import { useLevelStore } from '@/stores/level';
import { ref } from 'vue';
import type {Level} from '@/types/level'
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useMessageStore } from '@/stores/message'
import LevelService from '@/services/LevelService'
import InputText from '@/components/InputText.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'


const router = useRouter()
const levelStore = useLevelStore()
const messageStore = useMessageStore()
const { currentLevel: level } = storeToRefs(levelStore)
const validationSchema = yup.object({
  name: yup.string().required('The name is required'),
  description: yup.string().required('The description is required'),
  passScore: yup.mixed().required('The pass score is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: level.value ? level.value.name : '',
    description: level.value ? level.value.description : '',
    passScore: level.value ? String(level.value.passScore) : '',
  },
})
const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')
const { value: passScore } = useField<string>('passScore')

function showMessage(text: string) {
  messageStore.updateMessage(text)
  setTimeout(() => {
    messageStore.resetMessage()
  }, 3000)
}

const onSubmit = handleSubmit((values) => {
  if (!level.value) {
    return
  }
  const id = level.value.id
  LevelService.updateLevel(id, {
    name: values.name,
    description: values.description,
    passScore: Number(values.passScore),
  })
    .then((response) => {
      levelStore.setCurrentLevel(response.data)
      showMessage('Level "' + response.data.name + '" was saved')
      router.push({ name: 'admin-level', params: { id } })
    })
    .catch((error) => {
      if (error.response && error.response.status === 400) {
        showMessage('The pass score must be between 0 and 100')
      } else {
        showMessage('Could not save the level')
      }
    })
})




function backToDetail() {
  if (level.value) {
    router.push({ name: 'admin-level', params: { id: level.value.id } })
  }
}

</script>
<template>
    <div class="px-10 pt-3">
        <div v-if="level">
            <h1 class="text-white text-2xl">Edit {{ level.name }}</h1>
            <form @submit.prevent="onSubmit" class="bg-zinc-900 p-6 space-y-4 mt-6 border border-zinc-800 rounded-xl">
                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Name</span>
                    <InputText id="level-name" v-model="name" :error="errors['name']" />
                </div>

                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Pass Score</span>
                    <InputText id="level-pass-score" type="number" v-model="passScore" :error="errors['passScore']" />
                </div>

                <div class="flex items-center">
                    <span class="text-zinc-400 w-32">Description</span>
                    <div class="flex flex-col gap-1">
                        <textarea id="level-description" v-model="description" class="bg-zinc-950 border px-3 py-2 text-white rounded-xl outline-none" :class="errors['description'] ? 'border-red-500' : 'border-zinc-700 hover:border-zinc-500'"></textarea> 
                        <ErrorMessage v-if="errors['description']" id="level-description-error" class="text-sm text-red-400">
                            {{ errors['description'] }}
                        </ErrorMessage>
                    </div>
                </div>
                
                <div class="flex gap-3 pt-4">
                        <button type="submit" class="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 font-medium rounded-xl">Save</button>
                        <button type="button" class="px-5 py-2 bg-zinc-800 text-white hover:bg-zinc-700 font-medium rounded-xl" @click="backToDetail">Cancel</button>
                </div>
            </form>
        </div>
        <div v-else>
            <h1 class="text-white text-2xl">Level not found</h1>
        </div>
        
    </div>
</template>