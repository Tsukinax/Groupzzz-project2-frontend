<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import UserProfileCard from '@/components/UserProfileCard.vue'
const userStore = useUserStore()
</script>

<template>
  <UserProfileCard v-if="userStore.currentUser" :user="userStore.currentUser" :level-label="userStore.levelLabel" :show-status-toggle="true" @toggle-status="userStore.toggleStatus"/>
</template>
