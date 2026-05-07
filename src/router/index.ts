import MainLayout from '@/layouts/MainLayout.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: '',
        component: import("@/pages/MainPage.vue")
      },
      {
        path: 'admin',
        component: import("@/pages/AdminPage.vue")
      },
      {
        path: ':pathMatch(.*)*',
        component: import("@/pages/MainPage.vue")
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
