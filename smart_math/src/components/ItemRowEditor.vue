<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from './InputText.vue'
import type { ItemForm } from '@/types/level'

interface ItemRowEditorProps {
  inputId: string
  nameLabel: string
  initialName?: string
  initialDescription?: string
  isNew?: boolean
}
const props = withDefaults(defineProps<ItemRowEditorProps>(), {
  initialName: '',
  initialDescription: '',
  isNew: false,
})
const emit = defineEmits<{
  (e: 'save', payload: ItemForm): void
  (e: 'delete'): void
  (e: 'cancel'): void
}>()

const validationSchema = yup.object({
  name: yup.string().required('The ' + props.nameLabel.toLowerCase() + ' is required'),
  description: yup.string().required('The description is required'),
})

const { errors, handleSubmit } = useForm({
  validationSchema,
  initialValues: {
    name: props.initialName,
    description: props.initialDescription,
  },
})

const { value: name } = useField<string>('name')
const { value: description } = useField<string>('description')

const isConfirming = ref(false)

const onSubmit = handleSubmit((values) => {
  emit('save', { name: values.name, description: values.description })
})
</script>

<template>
  <form
    @submit.prevent="onSubmit"
    class="flex flex-col md:flex-row md:items-start gap-2 bg-zinc-950/60 border border-zinc-800 rounded-xl p-3"
  >
    <div class="md:w-1/3">
      <InputText :id="inputId + '-name'" v-model="name" :placeholder="nameLabel" :error="errors['name']" class="w-full" />
    </div>
    <div class="flex-1">
      <InputText :id="inputId + '-description'" v-model="description" placeholder="Description" :error="errors['description']" class="w-full" />
    </div>
    <div class="flex gap-2">
      <button type="submit" class="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-xl">
        {{ isNew ? 'Add' : 'Save' }}
      </button>
      <button v-if="isNew" type="button" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-xl" @click="emit('cancel')">
        Cancel
      </button>
      <template v-else>
        <button v-if="!isConfirming" type="button" class="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm rounded-xl" @click="isConfirming = true">
          Delete
        </button>
        <template v-else>
          <button type="button" class="px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-sm rounded-xl" @click="emit('delete')">
            Confirm
          </button>
          <button type="button" class="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-white text-sm rounded-xl" @click="isConfirming = false">
            Keep
          </button>
        </template>
      </template>
    </div>
  </form>
</template>
