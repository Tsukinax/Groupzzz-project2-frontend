<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/InputText.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import ProvinceSelect from '@/components/ProvinceSelect.vue'
import UploadService from '@/services/UploadService'
import { useAuthStore } from '@/stores/auth'
import { getErrorMessage } from '@/utils/errorMessage'

interface RegisterValues {
  username: string
  password: string
  confirmPassword: string
  name: string
  surname: string
  email: string
  province: string
  image: File | null
}

const MAX_IMAGE_SIZE = 10 * 1024 * 1024

const router = useRouter()
const authStore = useAuthStore()
const serverError = ref('')

const { errors, handleSubmit, isSubmitting } = useForm<RegisterValues>({
  validationSchema: yup.object({
    username: yup
      .string()
      .required('Please enter a username')
      .min(4, 'The username must be at least 4 characters')
      .max(30, 'The username must be at most 30 characters'),
    password: yup
      .string()
      .required('Please enter a password')
      .min(6, 'The password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .required('Please confirm your password')
      .oneOf([yup.ref('password')], 'The passwords do not match'),
    name: yup.string().required('Please enter your name'),
    surname: yup.string().required('Please enter your surname'),
    email: yup.string().required('Please enter your email address').email('Invalid email format'),
    province: yup.string().required('Please select a province'),
    image: yup
      .mixed<File>()
      .required('Please choose a profile image')
      .test('size', 'The image must be smaller than 10 MB', (file) => !file || file.size <= MAX_IMAGE_SIZE),
  }),
  initialValues: {
    username: '',
    password: '',
    confirmPassword: '',
    name: '',
    surname: '',
    email: '',
    province: '',
    image: null,
  },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const { value: name } = useField<string>('name')
const { value: surname } = useField<string>('surname')
const { value: email } = useField<string>('email')
const { value: province } = useField<string>('province')
const { value: image } = useField<File | null>('image')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    const uploaded = await UploadService.uploadImage(values.image as File)
    await authStore.register({
      username: values.username,
      password: values.password,
      name: values.name,
      surname: values.surname,
      email: values.email,
      province: values.province,
      image: uploaded.data,
    })
    router.push(authStore.homeRoute)
  } catch (error) {
    serverError.value = getErrorMessage(error, 'Registration failed, please try again')
  }
})

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-400'
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-10">
    <div class="w-full max-w-lg">
      <header class="mb-8 text-center">
        <RouterLink :to="{ name: 'landing' }" class="text-sm text-zinc-500 hover:text-zinc-300">
          Smart Math Passport
        </RouterLink>
        <h1 class="mt-2 text-3xl font-bold text-white">Create your passport</h1>
        <p class="mt-2 text-zinc-400">Everyone starts at Level 1</p>
      </header>

      <form
        class="space-y-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl sm:p-8"
        novalidate
        @submit.prevent="onSubmit"
      >
        <div>
          <span :class="labelClass">Profile image</span>
          <ImageUpload id="image" v-model="image" :error="errors.image" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="name" :class="labelClass">Name</label>
            <InputText id="name" v-model="name" :error="errors.name" placeholder="Somchai" />
          </div>
          <div>
            <label for="surname" :class="labelClass">Surname</label>
            <InputText id="surname" v-model="surname" :error="errors.surname" placeholder="Jaidee" />
          </div>
        </div>

        <div>
          <label for="email" :class="labelClass">Email</label>
          <InputText
            id="email"
            v-model="email"
            type="email"
            :error="errors.email"
            placeholder="somchai@example.com"
          />
        </div>

        <div>
          <label for="province" :class="labelClass">Province</label>
          <ProvinceSelect id="province" v-model="province" :error="errors.province" />
        </div>

        <div>
          <label for="username" :class="labelClass">Username</label>
          <InputText id="username" v-model="username" :error="errors.username" placeholder="somchai" />
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="password" :class="labelClass">Password</label>
            <InputText
              id="password"
              v-model="password"
              type="password"
              :error="errors.password"
              placeholder="At least 6 characters"
            />
          </div>
          <div>
            <label for="confirmPassword" :class="labelClass">Confirm password</label>
            <InputText
              id="confirmPassword"
              v-model="confirmPassword"
              type="password"
              :error="errors.confirmPassword"
              placeholder="Type it again"
            />
          </div>
        </div>

        <p v-if="serverError" class="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
          {{ serverError }}
        </p>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
        >
          {{ isSubmitting ? 'Creating account...' : 'Sign Up' }}
        </button>

        <p class="text-center text-sm text-zinc-500">
          Already have an account?
          <RouterLink :to="{ name: 'login' }" class="text-blue-400 hover:underline">Login</RouterLink>
        </p>
      </form>
    </div>
  </main>
</template>
