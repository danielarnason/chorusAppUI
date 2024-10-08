import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useUserStore } from '../views/stores/user';
import { supabase } from '../lib/supabaseClient';

const routes = [
  {
    path: '/',
    component: () => import('@/views/Login.vue'),
    name: 'Login'
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
        component: () => import('@/views/AktiviteterTab.vue'),
        name: 'Aktiviteter'
      },
      {
        path: 'nyhedsfeed',
        component: () => import('@/views/NyhedsFeed.vue')
      },
      {
        path: 'medlemmer',
        component: () => import('@/views/Medlemmer.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  
  const store = useUserStore()
  const { data, error } = await supabase.auth.getSession()
  if (to.name !== 'Login' && data.session == null) {
    next({name: 'Login'})
  } else if (to.name === 'Login' && data.session != null) {
    next({name: 'Aktiviteter'})
  } else {
    next()
  }
})
export default router
