<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user'
import { useMessageStore } from '@/stores/message'
import AdminUserService from '@/services/AdminUserService'
import UserProfileCard from '@/components/UserProfileCard.vue'
import { getErrorMessage } from '@/utils/errorMessage'

const userStore = useUserStore()
const messageStore = useMessageStore()
const { currentUser, levelLabel } = storeToRefs(userStore)

function showMessage(text: string) {
  messageStore.updateMessage(text)
  setTimeout(() => {
    messageStore.resetMessage()
  }, 3000)
}

async function toggleStatus(id: number) {
  if (currentUser.value === null) {
    return
  }
  const active = currentUser.value.status !== 'Active'
  try {
    const response = await AdminUserService.updateStatus(id, active)
    userStore.setCurrentUser(response.data)
    showMessage(active ? 'The user has been activated' : 'The user has been deactivated')
  } catch (error) {
    showMessage(getErrorMessage(error, 'Could not change the user status, please try again'))
  }
}
</script>

<template>
  <UserProfileCard v-if="currentUser" :user="currentUser" :level-label="levelLabel" :show-status-toggle="true" @toggle-status="toggleStatus"/>
</template>
