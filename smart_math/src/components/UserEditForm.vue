<script setup lang="ts">
import { computed, ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/InputText.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import ProvinceSelect from '@/components/ProvinceSelect.vue'
import UploadService from '@/services/UploadService'
import type { User, UserUpdateForm } from '@/types/user'

interface UserEditValues {
  name: string
  surname: string
  email: string
  province: string
  image: File | null
}

interface UserEditFormProps {
  user: User
  serverError?: string
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const props = withDefaults(defineProps<UserEditFormProps>(), {
  serverError: '',
})
const emit = defineEmits<{
  (e: 'save', form: UserUpdateForm): void
  (e: 'cancel'): void
}>()

const uploadError = ref('')
const errorMessage = computed(() => uploadError.value || props.serverError)

const { errors, handleSubmit, isSubmitting } = useForm<UserEditValues>({
  validationSchema: yup.object({
    name: yup.string().required('Please enter the name'),
    surname: yup.string().required('Please enter the surname'),
    email: yup.string().required('Please enter the email address').email('Invalid email format'),
    province: yup.string().required('Please select a province'),
    image: yup
      .mixed<File>()
      .nullable()
      .test('size', 'The image must be smaller than 10 MB', (file) => !file || file.size <= MAX_IMAGE_SIZE),
  }),
  initialValues: {
    name: props.user.name,
    surname: props.user.surname,
    email: props.user.email,
    province: props.user.province,
    image: null,
  },
})

const { value: name } = useField<string>('name')
const { value: surname } = useField<string>('surname')
const { value: email } = useField<string>('email')
const { value: province } = useField<string>('province')
const { value: image } = useField<File | null>('image')

const onSubmit = handleSubmit(async (values) => {
  uploadError.value = ''
  try {
    const imageUrl = values.image ? (await UploadService.uploadImage(values.image)).data : props.user.image
    emit('save', {
      name: values.name,
      surname: values.surname,
      email: values.email,
      province: values.province,
      image: imageUrl,
    })
  } catch {
    uploadError.value = 'Could not upload the image, please try again'
  }
})

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-400'
</script>

<template>
  <form
    class="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6"
    novalidate
    @submit.prevent="onSubmit"
  >
    <div>
      <span :class="labelClass">Profile image</span>
      <ImageUpload id="edit-image" v-model="image" :current-image="user.image" :error="errors.image" />
    </div>

    <div class="grid gap-4 sm:grid-cols-2">
      <div>
        <label for="edit-name" :class="labelClass">Name</label>
        <InputText id="edit-name" v-model="name" :error="errors.name" />
      </div>
      <div>
        <label for="edit-surname" :class="labelClass">Surname</label>
        <InputText id="edit-surname" v-model="surname" :error="errors.surname" />
      </div>
    </div>

    <div>
      <label for="edit-email" :class="labelClass">Email</label>
      <InputText id="edit-email" v-model="email" type="email" :error="errors.email" />
    </div>

    <div>
      <label for="edit-province" :class="labelClass">Province</label>
      <ProvinceSelect id="edit-province" v-model="province" :error="errors.province" />
    </div>

    <p v-if="errorMessage" class="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
      {{ errorMessage }}
    </p>

    <div class="flex flex-col gap-3 pt-2 sm:flex-row">
      <button
        type="submit"
        :disabled="isSubmitting"
        class="rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-500 disabled:opacity-60"
      >
        {{ isSubmitting ? 'Saving...' : 'Save' }}
      </button>
      <button
        type="button"
        class="rounded-xl bg-zinc-800 px-5 py-2 text-zinc-300 hover:bg-zinc-700"
        @click="emit('cancel')"
      >
        Cancel
      </button>
    </div>
  </form>
</template>
