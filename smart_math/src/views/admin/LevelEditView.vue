<script setup lang="ts">
import { useRouter } from 'vue-router'

import { useLevelStore } from '@/stores/level'
import { ref } from 'vue'

import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useMessageStore } from '@/stores/message'
import LevelService from '@/services/LevelService'
import InputText from '@/components/InputText.vue'
import ErrorMessage from '@/components/ErrorMessage.vue'
import ItemRowEditor from '@/components/ItemRowEditor.vue'
import type { ItemForm } from '@/types/level'

const router = useRouter()
const levelStore = useLevelStore()
const messageStore = useMessageStore()
const { currentLevel: level } = storeToRefs(levelStore)
const validationSchema = yup.object({
  name: yup.string().required('The name is required'),
  description: yup.string().required('The description is required'),
  passScore: yup
    .number()
    .typeError('The pass score must be a number')
    .integer('The pass score must be a whole number')
    .min(0, 'The pass score must be at least 0')
    .max(100, 'The pass score must be at most 100')
    .required('The pass score is required'),
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

const isAddingBenefit = ref(false)
const isAddingService = ref(false)

function reloadLevel(levelId: number) {
  return LevelService.getLevel(levelId).then((response) => {
    levelStore.setCurrentLevel(response.data)
  })
}

function addBenefit(payload: ItemForm) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.addBenefit(levelId, { title: payload.name, description: payload.description })
    .then(() => reloadLevel(levelId))
    .then(() => {
      isAddingBenefit.value = false
      showMessage('The benefit was added')
    })
    .catch(() => showMessage('Could not add the benefit'))
}

function saveBenefit(id: number, payload: ItemForm) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.updateBenefit(id, { title: payload.name, description: payload.description })
    .then(() => reloadLevel(levelId))
    .then(() => showMessage('The benefit was saved'))
    .catch(() => showMessage('Could not save the benefit'))
}

function deleteBenefit(id: number) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.deleteBenefit(id)
    .then(() => reloadLevel(levelId))
    .then(() => showMessage('The benefit was deleted'))
    .catch(() => showMessage('Could not delete the benefit'))
}

function addService(payload: ItemForm) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.addService(levelId, { name: payload.name, description: payload.description })
    .then(() => reloadLevel(levelId))
    .then(() => {
      isAddingService.value = false
      showMessage('The service was added')
    })
    .catch(() => showMessage('Could not add the service'))
}

function saveService(id: number, payload: ItemForm) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.updateService(id, { name: payload.name, description: payload.description })
    .then(() => reloadLevel(levelId))
    .then(() => showMessage('The service was saved'))
    .catch(() => showMessage('Could not save the service'))
}

function deleteService(id: number) {
  if (!level.value) {
    return
  }
  const levelId = level.value.id
  LevelService.deleteService(id)
    .then(() => reloadLevel(levelId))
    .then(() => showMessage('The service was deleted'))
    .catch(() => showMessage('Could not delete the service'))
}
</script>
<template>
  <div class="px-10 pt-3">
    <div v-if="level">
      <h1 class="text-white text-2xl">Edit {{ level.name }}</h1>
      <form
        @submit.prevent="onSubmit"
        class="bg-zinc-900 p-6 space-y-4 mt-6 border border-zinc-800 rounded-xl"
      >
        <div class="flex items-center">
          <span class="text-zinc-400 w-32">Name</span>
          <InputText id="level-name" v-model="name" :error="errors['name']" />
        </div>

        <div class="flex items-center">
          <span class="text-zinc-400 w-32">Pass Score</span>
          <InputText
            id="level-pass-score"
            type="number"
            v-model="passScore"
            :error="errors['passScore']"
          />
        </div>

        <div class="flex items-center">
          <span class="text-zinc-400 w-32">Description</span>
          <div class="flex flex-col gap-1">
            <textarea
              id="level-description"
              v-model="description"
              class="bg-zinc-950 border px-3 py-2 text-white rounded-xl outline-none"
              :class="
                errors['description'] ? 'border-red-500' : 'border-zinc-700 hover:border-zinc-500'
              "
            ></textarea>
            <ErrorMessage
              v-if="errors['description']"
              id="level-description-error"
              class="text-sm text-red-400"
            >
              {{ errors['description'] }}
            </ErrorMessage>
          </div>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="submit"
            class="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 font-medium rounded-xl"
          >
            Save
          </button>
          <button
            type="button"
            class="px-5 py-2 bg-zinc-800 text-white hover:bg-zinc-700 font-medium rounded-xl"
            @click="backToDetail"
          >
            Cancel
          </button>
        </div>
      </form>
      <div class="bg-zinc-900 p-6 mt-6 border border-zinc-800 rounded-xl space-y-3">
        <div class="flex justify-between items-center">
          <h2 class="text-white text-lg">Benefits</h2>
          <button
            v-if="!isAddingBenefit"
            type="button"
            class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-xl"
            @click="isAddingBenefit = true"
          >
            + Add benefit
          </button>
        </div>
        <ItemRowEditor
          v-for="b in level.benefits"
          :key="b.id"
          :input-id="'benefit-' + b.id"
          name-label="Title"
          :initial-name="b.title"
          :initial-description="b.description"
          @save="saveBenefit(b.id, $event)"
          @delete="deleteBenefit(b.id)"
        />
        <ItemRowEditor
          v-if="isAddingBenefit"
          input-id="benefit-new"
          name-label="Title"
          is-new
          @save="addBenefit"
          @cancel="isAddingBenefit = false"
        />
        <p v-if="level.benefits.length === 0 && !isAddingBenefit" class="text-zinc-500 text-sm">
          No benefits yet.
        </p>
      </div>

      <div class="bg-zinc-900 p-6 mt-6 border border-zinc-800 rounded-xl space-y-3">
        <div class="flex justify-between items-center">
          <h2 class="text-white text-lg">Services</h2>
          <button
            v-if="!isAddingService"
            type="button"
            class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-xl"
            @click="isAddingService = true"
          >
            + Add service
          </button>
        </div>
        <ItemRowEditor
          v-for="s in level.services"
          :key="s.id"
          :input-id="'service-' + s.id"
          name-label="Name"
          :initial-name="s.name"
          :initial-description="s.description"
          @save="saveService(s.id, $event)"
          @delete="deleteService(s.id)"
        />
        <ItemRowEditor
          v-if="isAddingService"
          input-id="service-new"
          name-label="Name"
          is-new
          @save="addService"
          @cancel="isAddingService = false"
        />
        <p v-if="level.services.length === 0 && !isAddingService" class="text-zinc-500 text-sm">
          No services yet.
        </p>
      </div>
    </div>
    <div v-else>
      <h1 class="text-white text-2xl">Level not found</h1>
    </div>
  </div>
</template>