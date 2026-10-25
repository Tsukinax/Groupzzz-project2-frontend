<script setup lang="ts">
import {useRoute,useRouter} from 'vue-router'
import {computed, onMounted,ref } from 'vue'
import paginationNav from '@/components/PaginationNav.vue'
import UserCard from '@/components/UserCard.vue'
import { useUserStore } from '@/stores/user'




const route = useRoute();
const router = useRouter();
const userStore = useUserStore();
const isLoading = ref(false)

onMounted(async ()=>{
    if (!userStore.isLoaded){
        isLoading.value = true
        try{
            await userStore.loadUsers()
        }
        finally{
            isLoading.value=false
        }
    }
})
const search = ref((route.query.search as string) || '')
const level=ref((route.query.level as string) ||'')
const province= ref((route.query.province as string)||'')

const provinces = computed(()=>{
    const list = userStore.users.map((u)=>u.province)
    return Array.from(new Set(list))
})

function updateFilter(){
    const query: Record<string,any>={page:1}
    if (search.value) query.search = search.value
    if (level.value) query.level=level.value
    if (province.value) query.province=province.value
    router.push({query})
}

const filteredUsers= computed(()=>{
    return userStore.users.filter((user)=>{
        const search=((route.query.search as string) || '').toLocaleLowerCase();
        const fullName = `${user.name} ${user.surname}`.toLowerCase();
        const matchSearch = !search || fullName.includes(search);
        const level = route.query.level;
        const matchLevel =!level||user.level === Number(level);
        const province=route.query.province;
        const matchProvince = !province || user.province === province;
        return matchSearch && matchLevel && matchProvince;
    })
})

const currentpage = computed(()=> Number(route.query.page) || 1);
const page = 3;
const totalPage = computed(() =>Math.ceil(filteredUsers.value.length / page)||1);
const pagedUser=computed(()=>{
    const start = (currentpage.value - 1) * page;
    const end = start + page;
    return filteredUsers.value.slice(start, end);
});

function goToUser(id: number){
    router.push({name:'admin-user',params:{id}});
}

</script>
<template>
    <div class="px-10 pt-3">
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-white text-2xl">Users</h1>
            <div class="text-zinc-400">{{filteredUsers.length}} Users</div>
        </div>

        <div class="flex gap-2 items-center">
            <div class="bg-zinc-900 border border-zinc-700 hover:border-zinc-500 rounded-xl  px-3 py-2 flex-1">
                <input v-model.lazy="search" @keyup.enter="updateFilter" type="text" placeholder="Search users..." class="bg-transparent text-zinc-100 placeholder:text-zinc-500 w-full outline-none" />
                
            </div>
            
            <select v-model="level" @change="updateFilter" class="w-48 bg-zinc-900 border border-zinc-700  px-3 py-2 text-white hover:border-zinc-500 rounded-xl">
                <option value="">Level</option>
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
            </select>

            <select v-model="province" @change="updateFilter" class="w-48 bg-zinc-900 border border-zinc-700  px-3 py-2 text-white hover:border-zinc-500 rounded-xl">
                <option value="">All Province</option>
                <option v-for="prov in provinces" :key="prov" :value="prov">{{ prov }}</option>
            </select>
        
        </div>
        <div class="bg-zinc-900 mt-6 overflow-hidden">
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
                    <tr v-if = "isLoading">
                        <td colspan="4" class="px-4 py-10 text-center text-zinc-500">Loading users...</td>
                    </tr>
                    <tr v-else-if="filteredUsers.length === 0">
                        <td colspan="4" class="px-4 py-10 text-center text-zinc-500">
                            No users found.
                        </td>
                    </tr>
                    <template v-else>
                        <UserCard v-for="user in pagedUser" :key="user.id" :user="user" @select="goToUser"> 
                        </UserCard>
                    </template>
                    
                </tbody>
            </table>

        </div>
        <paginationNav v-if="!isLoading && filteredUsers.length > 0" :currentPage="currentpage" :totalPages="totalPage"/>

    </div>

    

</template>
