import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main'
import store from '../store'
import Admin from '@/views/Admin'


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    meta: {
      layout: 'main'
    }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: {
      layout: 'main',
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      layout: 'admin',
      auth: true
    }
  },
  {
    path: '/admin/request/:id',
    name: 'Request',
    component: () => import('../views/Request.vue'),
    meta: {
      layout: 'admin',
      auth: true
    }
  },
  {
    path: '/admin/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
      layout: 'auth'
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to, from,next) => {
const requireAuth = to.meta.auth
  if (requireAuth && store.getters['auth/isAuthenticated']) {
    next()
  } else if (requireAuth && !store.getters['auth/isAuthenticated']) {
    next('/admin/auth?message=auth')
  } else {
    next()
  }
})

export default router
