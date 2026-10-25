<script setup lang="ts">import { RouterLink,RouterView } from 'vue-router'
</script>
<template>
    <div class="grid grid-cols-1 md:grid-cols-[300px_1fr] min-h-screen bg-zinc-950 text-zinc-100">
        <aside class="bg-zinc-900/90 p-4 border-r border-zinc-800">
            
            <div class="font-bold text-white mb-6 text-lg ">Admin</div>
            <nav class="flex flex-col gap-1.5">
                <RouterLink to="/admin/users" class="px-3 py-2  text-white" active-class="bg-blue-600 font-medium rounded-xl hover:bg-blue-600/80 hover:text-zinc-100">Users</RouterLink>
                <RouterLink to="/admin/levels" class="px-3 py-2  text-white" active-class="bg-blue-600 font-medium rounded-xl hover:bg-blue-600/80 hover:text-zinc-100">Levels</RouterLink>
                <RouterLink to="/admin/questions" class="px-3 py-2  text-white" active-class="bg-blue-600 font-medium rounded-xl hover:bg-blue-600/80 hover:text-zinc-100">Questions</RouterLink>
            </nav>
            
        </aside>
        <main class="bg-zinc-900/40 p-4 ">
            <RouterView />
        </main>

    </div>
</template>