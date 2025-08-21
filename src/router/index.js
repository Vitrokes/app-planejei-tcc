import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard', // O endereço da nova página
      name: 'dashboard',
      component: DashboardView // O componente a ser exibido
    },
    {
      path: '/planos/novo', // O endereço da página de criação
      name: 'criacao-plano',
      component: () => import('../views/CriacaoPlanoView.vue') 
    },
    {
      path: '/perfil', // O endereço da página de perfil
      name: 'perfil',
      component: () => import('../views/PerfilView.vue')
    },
  ]
})

export default router