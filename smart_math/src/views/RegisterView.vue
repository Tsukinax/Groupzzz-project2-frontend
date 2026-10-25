<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import type { RegisterForm, User } from '@/types/user'

const authStore = useAuthStore()

const PROVINCES = ['Chiang Mai', 'Bangkok', 'Phuket', 'Khon Kaen', 'Songkhla', 'Nakhon Ratchasima']
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PASSWORD_LENGTH = 6

const form = reactive<RegisterForm>({
  name: '',
  surname: '',
  email: '',
  password: '',
  province: '',
})

const submitted = ref(false)

const registered = ref<User | null>(null)

const errors = computed(() => {
  const found: Partial<Record<keyof RegisterForm, string>> = {}

  if (!form.name) found.name = 'Please enter your name'
  if (!form.surname) found.surname = 'Please enter your surname'

  if (!form.email) found.email = 'Please enter your email address'
  else if (!EMAIL_PATTERN.test(form.email)) found.email = 'Invalid email format'
  else if (authStore.isEmailTaken(form.email)) found.email = 'This email has already been used to sign up'

  if (!form.password) found.password = 'Please enter your password'
  else if (form.password.length < MIN_PASSWORD_LENGTH)
    found.password = `The password must be at least ${MIN_PASSWORD_LENGTH} characters`

  if (!form.province) found.province = 'Please select a province'

  return found
})

const isValid = computed(() => Object.keys(errors.value).length === 0)

const labelClass = 'mb-1.5 block text-sm font-medium text-zinc-400'
const errorClass = 'mt-1.5 text-sm text-red-400'

function fieldClass(field: keyof RegisterForm) {
  const base =
    'w-full rounded-lg border bg-zinc-950 px-3 py-2.5 text-zinc-100 ' +
    'placeholder:text-zinc-600 focus:outline-none'
  const invalid = submitted.value && errors.value[field]
  return `${base} ${invalid ? 'border-red-500' : 'border-zinc-700 focus:border-blue-500'}`
}

function handleSubmit() {
  submitted.value = true
  if (!isValid.value) return

  registered.value = authStore.register(form)
}
</script>

<template>
  <main class="flex min-h-screen items-center justify-center bg-zinc-900 px-4 py-10">
    <div class="w-full max-w-lg">
      <header class="mb-8 text-center">
        <h1 class="text-3xl font-bold text-white">Smart Math Passport</h1>
        <p class="mt-2 text-zinc-400">Sign up to get started at Level 1</p>
      </header>

      <section
        v-if="registered"
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 text-center shadow-xl sm:p-8"
      >
        <img
          :src="registered.image"
          :alt="registered.name"
          class="mx-auto h-20 w-20 rounded-full border-2 border-blue-500"
        />

        <h2 class="mt-4 text-xl font-semibold text-white">Registration successful</h2>
        <p class="mt-1 text-zinc-400">{{ registered.name }} {{ registered.surname }}</p>

        <p class="mt-4 inline-block rounded-full bg-blue-600 px-4 py-1.5 font-medium text-white">
          Level {{ registered.level }}
        </p>

        <dl class="mt-6 space-y-2 text-left text-sm">
          <div class="flex justify-between border-b border-zinc-800 pb-2">
            <dt class="text-zinc-500">Email</dt>
            <dd class="text-zinc-200">{{ registered.email }}</dd>
          </div>
          <div class="flex justify-between border-b border-zinc-800 pb-2">
            <dt class="text-zinc-500">Province</dt>
            <dd class="text-zinc-200">{{ registered.province }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-zinc-500">Status</dt>
            <dd class="text-green-400">{{ registered.status }}</dd>
          </div>
        </dl>

        <p class="mt-6 text-sm text-zinc-500">
          Start at Level 1 — pass the exam to advance your level and unlock additional services and benefits.
        </p>
      </section>

      <form
        v-else
        class="rounded-xl border border-zinc-800 bg-zinc-900/80 p-6 shadow-xl sm:p-8"
        novalidate
        @submit.prevent="handleSubmit"
      >
        <div class="grid gap-4 sm:grid-cols-2">
          <div>
            <label for="name" :class="labelClass">Name</label>
            <input
              id="name"
              v-model.trim="form.name"
              :class="fieldClass('name')"
              placeholder="Somchai"
            />
            <p v-if="submitted && errors.name" :class="errorClass">{{ errors.name }}</p>
          </div>

          <div>
            <label for="surname" :class="labelClass">Surname</label>
            <input
              id="surname"
              v-model.trim="form.surname"
              :class="fieldClass('surname')"
              placeholder="Jaidee"
            />
            <p v-if="submitted && errors.surname" :class="errorClass">{{ errors.surname }}</p>
          </div>
        </div>

        <div class="mt-4">
          <label for="email" :class="labelClass">Email</label>
          <input
            id="email"
            v-model.trim="form.email"
            type="email"
            :class="fieldClass('email')"
            placeholder="somchai@example.com"
          />
          <p v-if="submitted && errors.email" :class="errorClass">{{ errors.email }}</p>
        </div>

        <div class="mt-4">
          <label for="password" :class="labelClass">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            :class="fieldClass('password')"
            placeholder="At least 6 characters"
          />
          <p v-if="submitted && errors.password" :class="errorClass">{{ errors.password }}</p>
        </div>

        <div class="mt-4">
          <label for="province" :class="labelClass">Province</label>
          <select id="province" v-model="form.province" :class="fieldClass('province')">
            <option value="" disabled>Select province</option>
            <option v-for="province in PROVINCES" :key="province" :value="province">
              {{ province }}
            </option>
          </select>
          <p v-if="submitted && errors.province" :class="errorClass">{{ errors.province }}</p>
        </div>

        <button
          type="submit"
          class="mt-6 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-500"
        >
          Sign Up
        </button>
      </form>
    </div>
  </main>
</template>
