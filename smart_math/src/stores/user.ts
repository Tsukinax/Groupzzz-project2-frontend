import {defineStore} from 'pinia';
import type { User } from '@/types/user';
import DataService from '@/services/DataService';

interface UserState {
    users: User[]
    currentUser: User | null;
    isLoaded: boolean
}

export const useUserStore = defineStore('user', { 
    state: ():UserState=>({
        users:[],
        currentUser: null,
        isLoaded: false,
        }),
    getters:{
        hasUser:(state)=>state.currentUser !== null,
        levelLabel:(state)=> state.currentUser !== null ? "L"+state.currentUser.level: "-"
    }, 
    actions:{
        async loadUsers(){
            const response = await DataService.getData()
            this.users = response.data.users
            this.isLoaded= true
        },
        setCurrentUser(user: User){
            this.currentUser = user
        },
        clearCurrentUser(){
            this.currentUser=null
        },
        updateUser(updatedUser: User){
            const index =this.users.findIndex((u)=>u.id === updatedUser.id)
            if (index!== -1){
                this.users[index] = {...updatedUser}
            }
            if (this.currentUser && this.currentUser.id === updatedUser.id){
                this.currentUser={...updatedUser}
            }
        },
        toggleStatus(id:number){
            const user = this.users.find((u)=>u.id === id)
            if(user){
                user.status=user.status === 'Active'? 'Inactive' :'Active'
                if(this.currentUser && this.currentUser.id === id){
                    this.currentUser.status = user.status
                }
            }
        }

    }
});

