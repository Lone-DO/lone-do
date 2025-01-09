import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes.js'
import ZZZRoutes from '@zzz/router/routes.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes, ...ZZZRoutes]
})

export default router
