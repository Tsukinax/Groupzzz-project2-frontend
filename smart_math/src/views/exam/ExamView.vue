<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useExamStore } from '@/stores/exam'

const router = useRouter()
const examStore = useExamStore()

onMounted(async () => {
  try {
    await examStore.loadExam()
  } catch {
    router.push({ name: 'network-error-view' })
  }
})

async function handleSubmit() {
  if (!examStore.allAnswered) return
  try {
    await examStore.submitExam()
    router.push({ name: 'exam-result' })
  } catch {
    router.push({ name: 'network-error-view' })
  }
}
</script>
