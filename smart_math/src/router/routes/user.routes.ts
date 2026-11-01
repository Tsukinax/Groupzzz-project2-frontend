import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    meta: { guestOnly: true },
    component: () => import('@/views/LandingView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    meta: { guestOnly: true },
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    meta: { guestOnly: true },
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/user',
    component: () => import('@/views/user/UserLayout.vue'),
    meta: { requiresAuth: true, userOnly: true },
    children: [
      {
        path: '',
        name: 'user-home',
        component: () => import('@/views/user/UserHomeView.vue'),
      },
      {
        path: 'profile',
        component: () => import('@/views/user/ProfileLayout.vue'),
        children: [
          {
            path: '',
            name: 'user-profile',
            component: () => import('@/views/user/ProfileView.vue'),
          },
          {
            path: 'edit',
            name: 'user-profile-edit',
            component: () => import('@/views/user/ProfileEditView.vue'),
          },
          {
            path: 'history',
            name: 'user-history',
            component: () => import('@/views/user/ExamHistoryView.vue'),
          },
          {
            path: 'badges',
            name: 'user-badges',
            component: () => import('@/views/user/BadgeView.vue'),
          },
          {
            path: 'services',
            name: 'user-services',
            component: () => import('@/views/user/ServiceView.vue'),
          },
        ],
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]
