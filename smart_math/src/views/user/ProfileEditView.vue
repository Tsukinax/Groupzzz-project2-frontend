<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import UserEditForm from '@/components/UserEditForm.vue'
import UserService from '@/services/UserService'
import { useAuthStore } from '@/stores/auth'
import { useMessageStore } from '@/stores/message'
import { getErrorMessage } from '@/utils/errorMessage'
import type { UserUpdateForm } from '@/types/user'

const router = useRouter()
const authStore = useAuthStore()
const messageStore = useMessageStore()
const { currentUser } = storeToRefs(authStore)
const serverError = ref('')

async function saveProfile(form: UserUpdateForm) {
  serverError.value = ''
  try {
    const response = await UserService.updateMe(form)
    authStore.setCurrentUser(response.data)
    messageStore.updateMessage('Your profile has been updated')
    setTimeout(() => messageStore.resetMessage(), 3000)
    router.push({ name: 'user-profile' })
  } catch (error) {
    serverError.value = getErrorMessage(error, 'Could not save your profile, please try again')
  }
}
</script>

<template>
  <UserEditForm
    v-if="currentUser"
    :user="currentUser"
    :server-error="serverError"
    @save="saveProfile"
    @cancel="router.push({ name: 'user-profile' })"
  />
</template>
