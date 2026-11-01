import {defineStore} from 'pinia';
import type { User } from '@/types/user';

interface UserState {
    currentUser: User | null;
}

export const useUserStore = defineStore('user', { 
    state: ():UserState=>({
        currentUser: null,
        }),
    getters:{
        hasUser:(state)=>state.currentUser !== null,
        levelLabel:(state)=> state.currentUser !== null ? state.currentUser.levelName : "-"
    }, 
    actions:{
        setCurrentUser(user: User){
            this.currentUser = user
        },
        clearCurrentUser(){
            this.currentUser=null
        },
    }
});
