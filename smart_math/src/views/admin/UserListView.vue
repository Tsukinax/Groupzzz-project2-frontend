<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'
import {computed, onMounted, ref, watchEffect } from 'vue'
import paginationNav from '@/components/PaginationNav.vue'
import UserCard from '@/components/UserCard.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import AdminUserService from '@/services/AdminUserService'
import LevelService from '@/services/LevelService'
import { PROVINCES } from '@/constants/provinces'
import type { User } from '@/types/user'
import type { Level } from '@/types/level'

const props = defineProps({
    page: {
        type: Number,
        required: true
    }
})
const page = computed(() => props.page)
const PAGE_SIZE = 5

const route = useRoute();
const router = useRouter();
const users = ref<User[] | null>(null)
const totalUsers = ref(0)
const levels = ref<Level[]>([])

const totalPage = computed(() => Math.ceil(totalUsers.value / PAGE_SIZE) || 1)

const search = ref((route.query.search as string) || '')
const level=ref((route.query.level as string) ||'')
const province= ref((route.query.province as string)||'')

const levelOptions = computed(() => levels.value.map((l) => ({ value: String(l.id), label: l.name })))
const provinceOptions = PROVINCES.map((p) => ({ value: p, label: p }))

onMounted(() => {
    LevelService.getLevels()
        .then((response) => {
            levels.value = response.data
        })
        .catch(() => {
            router.push({ name: 'network-error-view' })
        })
})

watchEffect(() => {
    users.value = null
    const filter = {
        name: (route.query.search as string) || '',
        level: (route.query.level as string) || '',
        province: (route.query.province as string) || '',
    }
    AdminUserService.getUsers(PAGE_SIZE, page.value, filter)
        .then((response) => {
            users.value = response.data
            totalUsers.value = Number(response.headers['x-total-count'])
        })
        .catch(() => {
            router.push({ name: 'network-error-view' })
        })
})

function updateFilter(){
    const query: Record<string,any>={page:1}
    if (search.value) query.search = search.value
    if (level.value) query.level=level.value
    if (province.value) query.province=province.value
    router.push({query})
}

function clearFilter(){
    search.value = ''
    level.value = ''
    province.value = ''
    router.push({query:{page:1}})
}

function goToUser(id: number){
    router.push({name:'admin-user',params:{id}});
}

</script>
<template>
    <div class="px-10 pt-3">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-white text-2xl">Users</h1>
            <div class="text-zinc-400">{{ totalUsers }} Users</div>
        </div>

        <div class="flex flex-col md:flex-row gap-2 md:items-center">
            <div class="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-xl  px-3 py-2 flex-1">
                <input v-model.lazy="search" @keyup.enter="updateFilter" type="text" placeholder="Search users..." class="bg-transparent text-zinc-100 placeholder:text-zinc-500 w-full outline-none" />

            </div>

            <BaseSelect v-model="level" :options="levelOptions" placeholder="Level" @change="updateFilter" />

            <BaseSelect v-model="province" :options="provinceOptions" placeholder="All Province" @change="updateFilter" />

            <button type="button" class="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl" @click="clearFilter">Clear</button>

        </div>
        <div class="bg-zinc-900 mt-6 overflow-x-auto">
            <table class="w-full">
                <thead class="bg-black">
                    <tr>
                        <th class="px-4 py-3 text-zinc-400 text-left">Name</th>
                        <th class="px-4 py-3 text-zinc-400 text-left">Level</th>
                        <th class="px-4 py-3 text-zinc-400 text-left">Province</th>
                        <th class="px-4 py-3 text-zinc-400 text-left">Status</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-zinc-800">
                    <tr v-if = "users === null">
                        <td colspan="4" class="px-4 py-10 text-center text-zinc-500">Loading users...</td>
                    </tr>
                    <tr v-else-if="users.length === 0">
                        <td colspan="4" class="px-4 py-10 text-center text-zinc-500">
                            No users found.
                        </td>
                    </tr>
                    <template v-else>
                        <UserCard v-for="user in users" :key="user.id" :user="user" @select="goToUser">
                        </UserCard>
                    </template>

                </tbody>
            </table>

        </div>
        <paginationNav v-if="users && users.length > 0" :currentPage="page" :totalPages="totalPage"/>

    </div>



</template>
