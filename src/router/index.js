import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/',
    redirect: '/tabs/aktiviteter'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/aktiviteter'
      },
      {
        path: 'aktiviteter',
        component: () => import('@/views/AktiviteterTab.vue')
      },
      {
        path: 'nyhedsfeed',
        component: () => import('@/views/NyhedsFeed.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
