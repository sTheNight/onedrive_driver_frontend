import MainLayout from '@/layouts/MainLayout.vue'
import AdminPage from '@/pages/AdminPage.vue'
import MainPage from '@/pages/MainPage.vue'
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: '',
        component: MainPage
      },
      {
        path: 'admin',
        component: AdminPage
      },
      {
        path: ':pathMatch(.*)*',
        component: MainPage
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
