import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAuthStore } from '@/stores/auth'

import { userRoutes } from './routes/user.routes'
import type { RouteLocationNormalized } from 'vue-router'
import LevelService from '@/services/LevelService'
import { useLevelStore } from '@/stores/level'
import AdminUserService from '@/services/AdminUserService'


function loadLevel(to: RouteLocationNormalized) {
  const id = parseInt(to.params.id as string)
  const levelStore = useLevelStore()
  return LevelService.getLevel(id)
    .then((response) => {
      levelStore.setCurrentLevel(response.data)
    })
    .catch((error) => {
      if (error.response && error.response.status === 404) {
        return { name: '404-resource-view', params: { resource: 'level' } }
      } else {
        return { name: 'network-error-view' }
      }
    })
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: { requiresAuth: true, adminOnly: true },
      children: [
                {
          path: 'users',
          name: 'admin-users',
          component: () => import('../views/admin/UserListView.vue'),
          props: (route) => ({ page: parseInt(route.query.page?.toString() || '1') }),
        },
        {
          path: 'users/:id',
          name: 'admin-user',
          component: () => import('../views/admin/UserLayout.vue'),
          beforeEnter: (to) => {
            const id = parseInt(to.params.id as string)
            const userStore = useUserStore()
            return AdminUserService.getUser(id)
              .then((response) => {
                userStore.setCurrentUser(response.data)
              })
              .catch((error) => {
                if (error.response && error.response.status === 404) {
                  return { name: '404-resource-view', params: { resource: 'user' } }
                } else {
                  return { name: 'network-error-view' }
                }
              })
          },

          children: [
            {
              path: '',
              name: 'admin-user-info',
              component: () => import('../views/admin/UserInfoView.vue'),
            },
            {
              path: 'level',
              name: 'admin-user-level',
              component: () => import('../views/admin/UserLevelView.vue'),
            },
            {
              path: 'edit',
              name: 'admin-user-edit',
              component: () => import('../views/admin/UserEditView.vue'),
            },
          ],
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
          beforeEnter: loadLevel,
        },
        {
          path: 'levels/:id/edit',
          name: 'admin-level-edit',
          component: () => import('../views/admin/LevelEditView.vue'),
          beforeEnter: loadLevel,
        },
        {
          path: 'questions',
          name: 'admin-questions',
          component: () => import('../views/admin/QuestionListView.vue'),
        },
      ],
    },
    {
      path: '/exam',
      name: 'exam',
      component: () => import('../views/exam/ExamView.vue'),
      meta: { requiresAuth: true, userOnly: true },
    },
    {
      path: '/exam-result',
      name: 'exam-result',
      component: () => import('../views/exam/ExamResultView.vue'),
      meta: { requiresAuth: true, userOnly: true },
    },
    {
      path: '/learning',
      name: 'learning',
      component: () => import('../views/eLearning/eLearningView.vue'),
      meta: { requiresAuth: true, userOnly: true },
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
  const authStore = useAuthStore()

  if (to.meta.guestOnly && authStore.isLoggedIn) {
    return authStore.homeRoute
  }
  if (!to.meta.requiresAuth) {
    return true
  }
  if (!authStore.isLoggedIn) {
    return { name: 'login' }
  }
  if (to.meta.adminOnly && !authStore.isAdmin) {
    return authStore.homeRoute
  }
  if (to.meta.userOnly && authStore.isAdmin) {
    return authStore.homeRoute
  }
  return true
})

export default router
