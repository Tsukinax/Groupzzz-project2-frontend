<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import InputText from '@/components/InputText.vue'
import { useAuthStore } from '@/stores/auth'
import { getErrorMessage } from '@/utils/errorMessage'

const router = useRouter()
const authStore = useAuthStore()
const serverError = ref('')

const { errors, handleSubmit, isSubmitting } = useForm({
  validationSchema: yup.object({
    username: yup.string().required('Please enter your username'),
    password: yup.string().required('Please enter your password'),
  }),
  initialValues: { username: '', password: '' },
})

const { value: username } = useField<string>('username')
const { value: password } = useField<string>('password')

const onSubmit = handleSubmit(async (values) => {
  serverError.value = ''
  try {
    await authStore.login(values)
    router.push(authStore.homeRoute)
  } catch (error) {
    serverError.value = getErrorMessage(error, 'Cannot connect to the server, please try again')
  }
})
</script>

<template>
  <form class="space-y-4" novalidate @submit.prevent="onSubmit">
    <div>
      <label for="username" class="mb-1.5 block text-sm font-medium text-zinc-400">Username</label>
      <InputText id="username" v-model="username" :error="errors.username" placeholder="Your username" />
    </div>

    <div>
      <label for="password" class="mb-1.5 block text-sm font-medium text-zinc-400">Password</label>
      <InputText
        id="password"
        v-model="password"
        type="password"
        :error="errors.password"
        placeholder="Your password"
      />
    </div>

    <p v-if="serverError" class="rounded-lg bg-red-950 px-3 py-2 text-sm text-red-400">
      {{ serverError }}
    </p>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500 disabled:opacity-60"
    >
      {{ isSubmitting ? 'Signing in...' : 'Login' }}
    </button>

    <p class="text-center text-sm text-zinc-500">
      Don't have an account yet?
      <RouterLink :to="{ name: 'register' }" class="text-blue-400 hover:underline">Register</RouterLink>
    </p>
  </form>
</template>
