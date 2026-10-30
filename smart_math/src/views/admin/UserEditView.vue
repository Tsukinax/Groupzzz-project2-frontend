<script setup lang="ts">
import { ref } from 'vue';
import  { useUserStore } from '@/stores/user';
import type { User } from '@/types/user';
import { useRouter } from 'vue-router';

const userStore = useUserStore();
const router = useRouter();


const emptyUser: User = {
    id: 0,
    username:'',
    name: '',
    surname:'',
    email:'',
    level: 1,
    levelName: '',
    province: '',
    status: 'Active',
    image:'',
    roles: [],

}

const form = ref(userStore.currentUser ? {...userStore.currentUser} : {...emptyUser});
const saveUser = () => {
    userStore.updateUser({...form.value});
    router.push({name:'admin-user-info'});
}
const cancelEdit = () => {
    router.push({name:'admin-user-info'});
}


</script>

<template>
    <div class="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Name:</span>
            <input type="text" v-model="form.name" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none"/>
        </div>
        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Surname:</span>
            <input type="text" v-model="form.surname" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none"/>
        </div>
        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Email:</span>
            <input type="text" v-model="form.email" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none"/>
        </div>

        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Level</span>
            <select v-model.number="form.level" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none">
                <option value="1" class="text-white">Level 1</option>
                <option value="2" class="text-white">Level 2</option>
                <option value="3" class="text-white">Level 3</option>
                <option value="4" class="text-white">Level 4</option>
            </select>
        </div>

        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Province:</span>
            <input type="text" v-model="form.province" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none"/>
        </div>

        <div class="flex items-center">
            <span class="text-zinc-400 w-32">Status:</span>
            <select v-model="form.status" class="bg-zinc-950 border border-zinc-700 hover:border-zinc-500 rounded-xl px-3 py-1.5 outline-none">
                <option value="Active" class="text-white">Active</option>
                <option value="Inactive" class="text-white">Inactive</option>
            </select>
        </div>
        <div class="flex gap-3 pt-4">
            <button class="px-5 py-2 bg-blue-600 text-white hover:bg-blue-500 font-medium rounded-xl" @click="saveUser">Save</button>
            <button class="px-5 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl" @click="cancelEdit">Cancel</button>

        </div>
        

        

    </div>
</template>