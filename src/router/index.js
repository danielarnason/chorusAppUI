import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes = [
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
      // {
      //   path: 'tab2',
      //   component: () => import('@/views/Tab2Page.vue')
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
