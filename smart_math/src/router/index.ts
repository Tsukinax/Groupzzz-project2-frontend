import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

import { userRoutes } from './routes/user.routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta:{requiresAuth: true, adminOnly:true},
      children: [
        {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UserListView.vue'),
        },
        {
          path:'users/:id',
          name: 'admin-user',
          component: () => import('../views/admin/UserLayout.vue'), 
          beforeEnter: async(to)=>{
            const userStore = useUserStore()
            if(!userStore.isLoaded){
              await userStore.loadUsers()
            }
            const user = userStore.users.find((u)=> u.id === Number(to.params.id))
            if (!user){
              return {name:'admin-users'}
            }
            userStore.setCurrentUser(user)
          },
          children:[{
            path:'',
            name:'admin-user-info',
            component:()=> import('../views/admin/UserInfoView.vue')
          },{
            path:'level',
            name:'admin-user-level',
            component:()=> import('../views/admin/UserLevelView.vue') 
            
          },{
            path:'edit',
            name:'admin-user-edit',
            component:()=> import('../views/admin/UserEditView.vue')
          }
            
          ]
        },
        {
          path: 'levels',
          name: 'admin-levels',
          component: () => import('../views/admin/LevelListView.vue'),
        },
        {
          path: 'levels/:id',
          name: 'admin-level',
          component: () => import('../views/admin/LevelDetailView.vue'),
        },
        {
          path: 'levels/:id/edit',
          name: 'admin-level-edit',
          component: ()=> import('../views/admin/LevelEditView.vue')
        },
        {
          path: 'questions',
          name: 'admin-questions',
          component: () => import('../views/admin/QuestionListView.vue'),
        },
      ],
    },
    {
      path: '/exam/:levelId',
      name: 'exam',
      component: () => import('../views/exam/ExamView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/exam-result',
      name: 'exam-result',
      component: () => import('../views/exam/ExamResultView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/learning/:levelId',
      name: 'learning',
      component: () => import('../views/eLearning/eLearningView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: () => import('../views/NotFoundView.vue'),
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: () => import('../views/NetworkErrorView.vue'),
    },

    ...userRoutes,
  ],
})

router.beforeEach((to) => {

  if(!to.meta.requiresAuth){
    return true
  }
  const authStore = useAuthStore()
  const currentUser = authStore.currentUser

  if (!authStore.isLoggedIn || !currentUser) {
    return { name: 'login' }
  }
  if (to.meta.adminOnly && !authStore.isAdmin) {
    return { name: 'user-profile', params: { id: currentUser.id } }
  }

  if(to.meta.userOnly && authStore.isAdmin){
    return {name:'admin-users'}
  }

  return true
})

export default router
