<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import UserEditForm from '@/components/UserEditForm.vue'
import AdminUserService from '@/services/AdminUserService'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import { getErrorMessage } from '@/utils/errorMessage'
import type { UserUpdateForm } from '@/types/user'

const router = useRouter()
const userStore = useUserStore()
const messageStore = useMessageStore()
const { currentUser } = storeToRefs(userStore)
const serverError = ref('')

async function saveUser(form: UserUpdateForm) {
  if (currentUser.value === null) {
    return
  }
  serverError.value = ''
  try {
    const response = await AdminUserService.updateUser(currentUser.value.id, form)
    userStore.setCurrentUser(response.data)
    messageStore.updateMessage('The user has been updated')
    setTimeout(() => messageStore.resetMessage(), 3000)
    router.push({ name: 'admin-user-info' })
  } catch (error) {
    serverError.value = getErrorMessage(error, 'Could not save the user, please try again')
  }
}
</script>

<template>
  <UserEditForm
    v-if="currentUser"
    :user="currentUser"
    :server-error="serverError"
    @save="saveUser"
    @cancel="router.push({ name: 'admin-user-info' })"
  />
</template>
