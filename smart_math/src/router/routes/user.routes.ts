import type { RouteRecordRaw } from 'vue-router'

export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'landing',
    component: () => import('@/views/LandingView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    path: '/user/:id',
    component: () => import('@/views/user/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'user-profile',
        component: () => import('@/views/user/ProfileView.vue'),
      },
      {
        path: 'services',
        name: 'user-services',
        component: () => import('@/views/user/ServiceView.vue'),
      },
      {
        path: 'badges',
        name: 'user-badges',
        component: () => import('@/views/user/BadgeView.vue'),
      },
      {
        path: 'history',
        name: 'user-history',
        component: () => import('@/views/user/ExamHistoryView.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
  },
]
