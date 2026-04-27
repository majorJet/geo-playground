import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import { getDemoRoutes } from './parseMeta'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  ...getDemoRoutes()
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
