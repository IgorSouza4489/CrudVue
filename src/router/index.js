import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/components/HomePage.vue'
import CriarUsuario from '@/components/CriarUsuario.vue'


const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage

  },
  {
    path: '/CriarUsuario',
    name: 'CriarUsuario',
    component: CriarUsuario

  },
]


const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router