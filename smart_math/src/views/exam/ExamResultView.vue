<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const examStore = useExamStore()
const authStore = useAuthStore()

onMounted(() => {
  if (examStore.result?.levelUpgraded) {
    authStore.fetchCurrentUser()
  }
})
</script>
