<script setup lang="ts">
import { storeToRefs } from 'pinia'
import UserProfileCard from '@/components/UserProfileCard.vue'
import { useAuthStore } from '@/stores/auth'

const { currentUser } = storeToRefs(useAuthStore())
</script>

<template>
  <UserProfileCard v-if="currentUser" :user="currentUser" :level-label="currentUser.levelName" />
</template>
