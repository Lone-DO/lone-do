import { createRouter, createWebHistory, type Router } from 'vue-router'
// import stores from '@/stores'
import defaultRoutes from './routes'
/** Injected Projects */
import ZZZ, { type iSelf } from '@zzz'

export interface iRouter {
  instance: Router | null
  load: () => [] | null
  plugin: () => void
  build: () => void
}

function getPluginRoutes() {
  const plugins = [ZZZ]
  const data = plugins.reduce((routes, plugin: iSelf) => {
    try {
      if (plugin.router?.options?.routes?.length) {
        const filtered = plugin.router.options.routes.reduce(
          (collection: [], route: { meta: { internalOnly: false } }) => {
            if (route?.meta?.internalOnly) return collection
            return collection.concat({
              ...route,
              component: () => import('@/components/MockTemplate.vue')
            })
          },
          []
        )
        return routes.concat(filtered)
      }
      if (plugin.router?.load) return routes.concat(plugin.router.load())
    } catch (error) {
      console.error(error)
      return routes
    }
  }, [])

  return data
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...defaultRoutes, ...getPluginRoutes()]
})

export default router
