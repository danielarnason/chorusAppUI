import { createRouter, createWebHistory } from '@ionic/vue-router';
import TabsPage from '../views/TabsPage.vue'
import { useUserStore } from '../views/stores/user';
import { supabase } from '../lib/supabaseClient';

const routes = [
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'Login'
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

router.beforeEach(async (to, from, next) => {
  
  const store = useUserStore()
  const { data, error } = await supabase.auth.getSession()
  if (to.name !== 'Login' && data.session == null) {
    next({name: 'Login'})
  } else {
    next()
  }
})
export default router
